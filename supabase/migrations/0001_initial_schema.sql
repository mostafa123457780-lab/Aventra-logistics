-- =====================================================================
-- AVENTRA Logistics — Phase 1 schema
-- Contains the 10 tables confirmed from the existing codebase's queries.
-- The remaining tables (vehicles, drivers, payments, containers, etc.)
-- will be added in Phase 2 once their exact column names are confirmed
-- against your live Supabase project, to avoid destructive conflicts.
-- This file is written to be safely re-runnable (IF NOT EXISTS / OR REPLACE).
-- =====================================================================

-- ---------------------------------------------------------------------
-- EXTENSIONS
-- ---------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- CORE TABLES
-- ---------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  phone text,
  role text not null default 'CUSTOMER'
    check (role in ('CUSTOMER','ADMIN','OPERATIONS_MANAGER','ACCOUNTANT','WAREHOUSE_MANAGER','WAREHOUSE_EMPLOYEE','DRIVER')),
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (profile_id)
);

create table if not exists public.warehouses (
  id uuid primary key default gen_random_uuid(),
  warehouse_name text not null,
  warehouse_code text not null unique,
  country text not null,
  city text not null,
  capacity integer,
  created_at timestamptz not null default now()
);

create table if not exists public.warehouse_locations (
  id uuid primary key default gen_random_uuid(),
  warehouse_id uuid not null references public.warehouses (id) on delete cascade,
  zone text,
  rack text,
  shelf text,
  bin text,
  created_at timestamptz not null default now()
);

create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid(),
  warehouse_id uuid references public.warehouses (id) on delete set null,
  item_name text not null,
  sku text,
  quantity integer not null default 0,
  status text,
  created_at timestamptz not null default now()
);

create table if not exists public.shipments (
  id uuid primary key default gen_random_uuid(),
  tracking_number text not null unique,
  customer_id uuid not null references public.customers (id) on delete cascade,
  origin text not null,
  destination text not null,
  service_type text,
  status text not null default 'Pending',
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  customer_id uuid not null references public.customers (id) on delete cascade,
  shipment_id uuid references public.shipments (id) on delete set null,
  amount numeric(12,2) not null,
  payment_status text not null default 'Pending',
  created_at timestamptz not null default now()
);

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers (id) on delete cascade,
  request_type text not null,
  description text,
  status text not null default 'Open',
  created_at timestamptz not null default now()
);

create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  shipment_id uuid references public.shipments (id) on delete set null,
  status text not null default 'Pending',
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles (id) on delete set null,
  action text not null,
  table_name text not null,
  record_id text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- INDEXES (fixes the missing indexes that were causing slow queries)
-- ---------------------------------------------------------------------
create index if not exists idx_shipments_customer_id on public.shipments (customer_id);
create index if not exists idx_shipments_created_at on public.shipments (created_at desc);
create index if not exists idx_invoices_customer_id on public.invoices (customer_id);
create index if not exists idx_invoices_payment_status on public.invoices (payment_status);
create index if not exists idx_requests_customer_id on public.requests (customer_id);
create index if not exists idx_warehouse_locations_warehouse_id on public.warehouse_locations (warehouse_id);
create index if not exists idx_inventory_warehouse_id on public.inventory (warehouse_id);
create index if not exists idx_audit_logs_created_at on public.audit_logs (created_at desc);
create index if not exists idx_profiles_role on public.profiles (role);

-- =====================================================================
-- NEW USER PROVISIONING
-- Fires when someone completes Supabase Auth sign-up (see
-- src/app/auth/register). Reads full_name/phone from the signUp() call's
-- `options.data` and creates the matching profiles + customers rows with
-- the default CUSTOMER role.
-- =====================================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
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

-- =====================================================================
-- is_admin() helper — avoids the recursive-subquery performance problem
-- (every RLS policy that checked "select role from profiles" was forcing
-- an extra query against profiles on every single row). This function is
-- STABLE so Postgres can cache the result for the duration of the query.
-- =====================================================================
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'ADMIN'
  );
$$;

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================
alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.shipments enable row level security;
alter table public.invoices enable row level security;
alter table public.requests enable row level security;
alter table public.trips enable row level security;
alter table public.inventory enable row level security;
alter table public.warehouses enable row level security;
alter table public.warehouse_locations enable row level security;
alter table public.audit_logs enable row level security;

-- Profiles: everyone can read their own row; admins read all
drop policy if exists "own_profile" on public.profiles;
create policy "own_profile" on public.profiles
  for select using (id = auth.uid());

drop policy if exists "admin_all_profiles" on public.profiles;
create policy "admin_all_profiles" on public.profiles
  for all using (public.is_admin());

-- Customers: own row only; admins full access
drop policy if exists "own_customer_row" on public.customers;
create policy "own_customer_row" on public.customers
  for select using (profile_id = auth.uid());

drop policy if exists "admin_all_customers" on public.customers;
create policy "admin_all_customers" on public.customers
  for all using (public.is_admin());

-- Shipments: customers see their own; admins see everything
drop policy if exists "own_shipments" on public.shipments;
create policy "own_shipments" on public.shipments
  for select using (
    customer_id in (select id from public.customers where profile_id = auth.uid())
  );

drop policy if exists "admin_all_shipments" on public.shipments;
create policy "admin_all_shipments" on public.shipments
  for all using (public.is_admin());

-- Invoices: customers see their own; admins see everything
drop policy if exists "own_invoices" on public.invoices;
create policy "own_invoices" on public.invoices
  for select using (
    customer_id in (select id from public.customers where profile_id = auth.uid())
  );

drop policy if exists "admin_all_invoices" on public.invoices;
create policy "admin_all_invoices" on public.invoices
  for all using (public.is_admin());

-- Requests: customers see their own; admins see everything
drop policy if exists "own_requests" on public.requests;
create policy "own_requests" on public.requests
  for select using (
    customer_id in (select id from public.customers where profile_id = auth.uid())
  );

drop policy if exists "admin_all_requests" on public.requests;
create policy "admin_all_requests" on public.requests
  for all using (public.is_admin());

-- Trips, inventory, warehouses, warehouse_locations: internal staff only
drop policy if exists "admin_all_trips" on public.trips;
create policy "admin_all_trips" on public.trips
  for all using (public.is_admin());

drop policy if exists "admin_all_inventory" on public.inventory;
create policy "admin_all_inventory" on public.inventory
  for all using (public.is_admin());

drop policy if exists "read_warehouses" on public.warehouses;
create policy "read_warehouses" on public.warehouses
  for select using (public.is_admin());

drop policy if exists "admin_all_warehouses" on public.warehouses;
create policy "admin_all_warehouses" on public.warehouses
  for all using (public.is_admin());

drop policy if exists "admin_all_warehouse_locations" on public.warehouse_locations;
create policy "admin_all_warehouse_locations" on public.warehouse_locations
  for all using (public.is_admin());

-- Audit logs: read-only, admins only
drop policy if exists "admin_read_audit_logs" on public.audit_logs;
create policy "admin_read_audit_logs" on public.audit_logs
  for select using (public.is_admin());
