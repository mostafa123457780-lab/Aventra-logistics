-- AVENTRA Logistics — Supabase schema
-- Run in the Supabase SQL editor (or via `supabase db push`).
-- Phase 1 ships the schema + RLS pattern; wire up real reads/writes from the
-- dashboard apps in Phase 2.

create extension if not exists "uuid-ossp";

-- ============================================================
-- CORE IDENTITY
-- ============================================================

create table profiles (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text not null,
  phone text,
  role text not null check (role in (
    'ADMIN','OPERATIONS_MANAGER','ACCOUNTANT','WAREHOUSE_MANAGER',
    'WAREHOUSE_EMPLOYEE','DRIVER','CUSTOMER'
  )),
  created_at timestamptz default now()
);

create table customers (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  company_name text,
  address text,
  notes text,
  created_at timestamptz default now(),
  deleted_at timestamptz
);

create table drivers (
  id uuid primary key default uuid_generate_v4(),
  profile_id uuid references profiles(id) on delete cascade,
  license_number text not null,
  license_expiry date
);

-- ============================================================
-- WAREHOUSING
-- ============================================================

create table warehouses (
  id uuid primary key default uuid_generate_v4(),
  warehouse_name text not null,
  warehouse_code text unique not null,
  country text not null,
  city text not null,
  address text,
  capacity numeric,
  created_at timestamptz default now(),
  deleted_at timestamptz
);

create table warehouse_locations (
  id uuid primary key default uuid_generate_v4(),
  warehouse_id uuid references warehouses(id) on delete cascade,
  zone text,
  rack text,
  shelf text,
  bin text
);

-- ============================================================
-- SHIPMENTS & TRACKING
-- ============================================================

create table shipments (
  id uuid primary key default uuid_generate_v4(),
  tracking_number text unique not null,
  customer_id uuid references customers(id),
  warehouse_id uuid references warehouses(id),
  origin text not null,
  destination text not null,
  service_type text not null check (service_type in ('Sea Freight','Air Freight','Land Freight','Multimodal')),
  weight numeric,
  volume numeric,
  cost numeric,
  status text not null default 'Pending' check (status in (
    'Pending','Processing','Picked Up','In Warehouse','In Transit',
    'Customs Clearance','Out For Delivery','Delivered','Cancelled'
  )),
  created_at timestamptz default now(),
  deleted_at timestamptz
);

create table shipment_tracking (
  id uuid primary key default uuid_generate_v4(),
  shipment_id uuid references shipments(id) on delete cascade,
  location text,
  status text not null,
  notes text,
  created_at timestamptz default now()
);

create table containers (
  id uuid primary key default uuid_generate_v4(),
  container_number text unique not null,
  container_type text,
  container_size text,
  status text,
  location text,
  shipment_id uuid references shipments(id)
);

-- ============================================================
-- FLEET & TRIPS
-- ============================================================

create table vehicles (
  id uuid primary key default uuid_generate_v4(),
  vehicle_number text not null,
  plate_number text unique not null,
  vehicle_type text,
  capacity numeric,
  status text
);

create table trips (
  id uuid primary key default uuid_generate_v4(),
  trip_number text unique not null,
  driver_id uuid references drivers(id),
  vehicle_id uuid references vehicles(id),
  origin text,
  destination text,
  departure_date date,
  arrival_date date,
  status text
);

-- ============================================================
-- INVENTORY
-- ============================================================

create table inventory (
  id uuid primary key default uuid_generate_v4(),
  warehouse_id uuid references warehouses(id),
  shipment_id uuid references shipments(id),
  item_name text not null,
  sku text,
  quantity integer not null default 0,
  status text
);

-- ============================================================
-- BILLING
-- ============================================================

create table invoices (
  id uuid primary key default uuid_generate_v4(),
  invoice_number text unique not null,
  customer_id uuid references customers(id),
  shipment_id uuid references shipments(id),
  amount numeric not null,
  payment_status text not null default 'Draft' check (payment_status in (
    'Draft','Pending','Partially Paid','Paid','Overdue','Cancelled'
  )),
  created_at timestamptz default now(),
  deleted_at timestamptz
);

create table payments (
  id uuid primary key default uuid_generate_v4(),
  invoice_id uuid references invoices(id) on delete cascade,
  amount numeric not null,
  payment_method text,
  payment_date timestamptz default now()
);

create table expenses (
  id uuid primary key default uuid_generate_v4(),
  expense_type text,
  amount numeric not null,
  notes text,
  created_at timestamptz default now()
);

-- ============================================================
-- REQUESTS, DOCUMENTS, AUDIT
-- ============================================================

create table requests (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid references customers(id),
  request_type text not null,
  description text,
  status text default 'new',
  created_at timestamptz default now()
);

create table documents (
  id uuid primary key default uuid_generate_v4(),
  entity_type text not null,
  entity_id uuid not null,
  file_url text not null,
  uploaded_at timestamptz default now()
);

create table audit_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references profiles(id),
  action text not null,
  table_name text not null,
  record_id text,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz default now()
);

-- ============================================================
-- NEW USER PROVISIONING
-- ============================================================
-- Fires when someone completes Supabase Auth sign-up (see src/app/auth/register).
-- Reads full_name/phone from the signUp() call's `options.data` and creates
-- the matching profiles + customers rows with the default CUSTOMER role.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, phone, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.raw_user_meta_data->>'phone',
    'CUSTOMER'
  );

  insert into public.customers (profile_id)
  values (new.id);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- ROW LEVEL SECURITY (representative policies — extend per role)
-- ============================================================

alter table profiles enable row level security;
alter table customers enable row level security;
alter table shipments enable row level security;
alter table invoices enable row level security;
alter table requests enable row level security;
alter table trips enable row level security;
alter table inventory enable row level security;

-- Profiles: everyone can read their own row; admins read all
create policy "own_profile" on profiles
  for select using (id = auth.uid());

create policy "admin_all_profiles" on profiles
  for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'ADMIN')
  );

-- Customers: own row only; admins full access
create policy "own_customer_row" on customers
  for select using (profile_id = auth.uid());

create policy "admin_all_customers" on customers
  for all using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'ADMIN')
  );

-- Admins: full access
create policy "admin_full_access_shipments" on shipments
  for all using (
    exists (select 1 from profiles where profiles.id = auth.uid() and profiles.role = 'ADMIN')
  );

-- Customers: only their own shipments
create policy "customer_own_shipments" on shipments
  for select using (
    customer_id in (select id from customers where profile_id = auth.uid())
  );

-- Customers: only their own invoices
create policy "customer_own_invoices" on invoices
  for select using (
    customer_id in (select id from customers where profile_id = auth.uid())
  );

-- Customers: only their own requests
create policy "customer_own_requests" on requests
  for all using (
    customer_id in (select id from customers where profile_id = auth.uid())
  );

-- Drivers: only their assigned trips
create policy "driver_assigned_trips" on trips
  for select using (
    driver_id in (select id from drivers where profile_id = auth.uid())
  );

-- Warehouse staff: inventory access
create policy "warehouse_staff_inventory" on inventory
  for all using (
    exists (
      select 1 from profiles
      where profiles.id = auth.uid()
      and profiles.role in ('WAREHOUSE_MANAGER','WAREHOUSE_EMPLOYEE','ADMIN')
    )
  );
