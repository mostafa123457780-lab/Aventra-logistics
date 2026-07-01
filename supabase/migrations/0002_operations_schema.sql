-- =====================================================================
-- AVENTRA Logistics — Phase 2 migration
-- Adds: branches, regions, governorates, shipping_companies, vehicles,
-- drivers, driver_assistants, containers, payments, vehicle_expenses.
-- Extends: trips (vehicle/driver/driver_assistant assignment).
-- Purely additive — safe to run after 0001_initial_schema.sql without
-- touching any existing table or data.
-- =====================================================================

-- ---------------------------------------------------------------------
-- GEOGRAPHY / ORG STRUCTURE
-- ---------------------------------------------------------------------
create table if not exists public.regions (
  id uuid primary key default gen_random_uuid(),
  region_name text not null,
  country text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.governorates (
  id uuid primary key default gen_random_uuid(),
  governorate_name text not null,
  region_id uuid references public.regions (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.branches (
  id uuid primary key default gen_random_uuid(),
  branch_name text not null,
  branch_code text not null unique,
  city text not null,
  country text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.shipping_companies (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  contact_phone text,
  contact_email text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- FLEET
-- ---------------------------------------------------------------------
create table if not exists public.vehicles (
  id uuid primary key default gen_random_uuid(),
  plate_number text not null unique,
  vehicle_type text not null,
  capacity_kg numeric(10,2),
  status text not null default 'Active'
    check (status in ('Active','Maintenance','Inactive')),
  branch_id uuid references public.branches (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.drivers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles (id) on delete cascade,
  license_number text not null unique,
  vehicle_id uuid references public.vehicles (id) on delete set null,
  branch_id uuid references public.branches (id) on delete set null,
  status text not null default 'Active'
    check (status in ('Active','Off Duty','Suspended')),
  created_at timestamptz not null default now()
);

create table if not exists public.driver_assistants (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null unique references public.profiles (id) on delete cascade,
  driver_id uuid references public.drivers (id) on delete set null,
  created_at timestamptz not null default now()
);

-- Extend trips with fleet assignment (additive columns only)
alter table public.trips add column if not exists vehicle_id uuid references public.vehicles (id) on delete set null;
alter table public.trips add column if not exists driver_id uuid references public.drivers (id) on delete set null;
alter table public.trips add column if not exists driver_assistant_id uuid references public.driver_assistants (id) on delete set null;

-- ---------------------------------------------------------------------
-- WAREHOUSE / CARGO
-- ---------------------------------------------------------------------
create table if not exists public.containers (
  id uuid primary key default gen_random_uuid(),
  container_number text not null unique,
  container_type text not null,
  status text not null default 'Empty'
    check (status in ('Empty','Loading','In Transit','Delivered')),
  warehouse_id uuid references public.warehouses (id) on delete set null,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- FINANCE
-- ---------------------------------------------------------------------
create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid not null references public.invoices (id) on delete cascade,
  amount numeric(12,2) not null check (amount > 0),
  method text not null default 'Bank Transfer',
  paid_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table if not exists public.vehicle_expenses (
  id uuid primary key default gen_random_uuid(),
  vehicle_id uuid not null references public.vehicles (id) on delete cascade,
  expense_type text not null,
  amount numeric(12,2) not null check (amount > 0),
  expense_date date not null default current_date,
  notes text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- INDEXES
-- ---------------------------------------------------------------------
create index if not exists idx_governorates_region_id on public.governorates (region_id);
create index if not exists idx_vehicles_branch_id on public.vehicles (branch_id);
create index if not exists idx_drivers_profile_id on public.drivers (profile_id);
create index if not exists idx_drivers_vehicle_id on public.drivers (vehicle_id);
create index if not exists idx_drivers_branch_id on public.drivers (branch_id);
create index if not exists idx_driver_assistants_profile_id on public.driver_assistants (profile_id);
create index if not exists idx_driver_assistants_driver_id on public.driver_assistants (driver_id);
create index if not exists idx_trips_vehicle_id on public.trips (vehicle_id);
create index if not exists idx_trips_driver_id on public.trips (driver_id);
create index if not exists idx_containers_warehouse_id on public.containers (warehouse_id);
create index if not exists idx_payments_invoice_id on public.payments (invoice_id);
create index if not exists idx_vehicle_expenses_vehicle_id on public.vehicle_expenses (vehicle_id);

-- =====================================================================
-- has_role() — generalised version of Phase 1's is_admin(), avoids the
-- same recursive-subquery cost for every internal-staff policy below.
-- =====================================================================
create or replace function public.has_role(roles text[])
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = any(roles)
  );
$$;

-- =====================================================================
-- Auto-reconcile invoice payment_status as payments come in.
-- =====================================================================
create or replace function public.update_invoice_payment_status()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  invoice_amount numeric;
  total_paid numeric;
begin
  select amount into invoice_amount from public.invoices where id = new.invoice_id;
  select coalesce(sum(amount), 0) into total_paid from public.payments where invoice_id = new.invoice_id;

  if total_paid >= invoice_amount then
    update public.invoices set payment_status = 'Paid' where id = new.invoice_id;
  elsif total_paid > 0 then
    update public.invoices set payment_status = 'Partially Paid' where id = new.invoice_id;
  end if;

  return new;
end;
$$;

drop trigger if exists on_payment_created on public.payments;
create trigger on_payment_created
  after insert on public.payments
  for each row execute function public.update_invoice_payment_status();

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================
alter table public.regions enable row level security;
alter table public.governorates enable row level security;
alter table public.branches enable row level security;
alter table public.shipping_companies enable row level security;
alter table public.vehicles enable row level security;
alter table public.drivers enable row level security;
alter table public.driver_assistants enable row level security;
alter table public.containers enable row level security;
alter table public.payments enable row level security;
alter table public.vehicle_expenses enable row level security;

-- Geography / org structure: all internal staff can read; admin manages
drop policy if exists "staff_read_regions" on public.regions;
create policy "staff_read_regions" on public.regions
  for select using (public.has_role(array['ADMIN','OPERATIONS_MANAGER','ACCOUNTANT','WAREHOUSE_MANAGER','WAREHOUSE_EMPLOYEE','DRIVER']));
drop policy if exists "admin_write_regions" on public.regions;
create policy "admin_write_regions" on public.regions
  for all using (public.is_admin());

drop policy if exists "staff_read_governorates" on public.governorates;
create policy "staff_read_governorates" on public.governorates
  for select using (public.has_role(array['ADMIN','OPERATIONS_MANAGER','ACCOUNTANT','WAREHOUSE_MANAGER','WAREHOUSE_EMPLOYEE','DRIVER']));
drop policy if exists "admin_write_governorates" on public.governorates;
create policy "admin_write_governorates" on public.governorates
  for all using (public.is_admin());

drop policy if exists "staff_read_branches" on public.branches;
create policy "staff_read_branches" on public.branches
  for select using (public.has_role(array['ADMIN','OPERATIONS_MANAGER','ACCOUNTANT','WAREHOUSE_MANAGER','WAREHOUSE_EMPLOYEE','DRIVER']));
drop policy if exists "admin_write_branches" on public.branches;
create policy "admin_write_branches" on public.branches
  for all using (public.is_admin());

drop policy if exists "staff_read_shipping_companies" on public.shipping_companies;
create policy "staff_read_shipping_companies" on public.shipping_companies
  for select using (public.has_role(array['ADMIN','OPERATIONS_MANAGER']));
drop policy if exists "admin_write_shipping_companies" on public.shipping_companies;
create policy "admin_write_shipping_companies" on public.shipping_companies
  for all using (public.is_admin());

-- Vehicles: operations manage; assigned driver can read their own vehicle
drop policy if exists "own_vehicle_driver" on public.vehicles;
create policy "own_vehicle_driver" on public.vehicles
  for select using (
    id in (select vehicle_id from public.drivers where profile_id = auth.uid())
  );
drop policy if exists "staff_manage_vehicles" on public.vehicles;
create policy "staff_manage_vehicles" on public.vehicles
  for all using (public.has_role(array['ADMIN','OPERATIONS_MANAGER']));

-- Drivers: operations manage; a driver can read their own row
drop policy if exists "own_driver_row" on public.drivers;
create policy "own_driver_row" on public.drivers
  for select using (profile_id = auth.uid());
drop policy if exists "staff_manage_drivers" on public.drivers;
create policy "staff_manage_drivers" on public.drivers
  for all using (public.has_role(array['ADMIN','OPERATIONS_MANAGER']));

-- Driver assistants: same pattern
drop policy if exists "own_driver_assistant_row" on public.driver_assistants;
create policy "own_driver_assistant_row" on public.driver_assistants
  for select using (profile_id = auth.uid());
drop policy if exists "staff_manage_driver_assistants" on public.driver_assistants;
create policy "staff_manage_driver_assistants" on public.driver_assistants
  for all using (public.has_role(array['ADMIN','OPERATIONS_MANAGER']));

-- Containers: warehouse + operations staff
drop policy if exists "staff_manage_containers" on public.containers;
create policy "staff_manage_containers" on public.containers
  for all using (public.has_role(array['ADMIN','OPERATIONS_MANAGER','WAREHOUSE_MANAGER','WAREHOUSE_EMPLOYEE']));

-- Payments: customer sees payments made on their own invoices; finance staff manage
drop policy if exists "own_payments" on public.payments;
create policy "own_payments" on public.payments
  for select using (
    invoice_id in (
      select id from public.invoices
      where customer_id in (select id from public.customers where profile_id = auth.uid())
    )
  );
drop policy if exists "staff_manage_payments" on public.payments;
create policy "staff_manage_payments" on public.payments
  for all using (public.has_role(array['ADMIN','ACCOUNTANT']));

-- Vehicle expenses: finance + operations read, finance manages
drop policy if exists "staff_read_vehicle_expenses" on public.vehicle_expenses;
create policy "staff_read_vehicle_expenses" on public.vehicle_expenses
  for select using (public.has_role(array['ADMIN','ACCOUNTANT','OPERATIONS_MANAGER']));
drop policy if exists "staff_manage_vehicle_expenses" on public.vehicle_expenses;
create policy "staff_manage_vehicle_expenses" on public.vehicle_expenses
  for all using (public.has_role(array['ADMIN','ACCOUNTANT']));

-- Trips: broaden Phase 1 policy so a driver can read their own assigned trips
drop policy if exists "own_trips_driver" on public.trips;
create policy "own_trips_driver" on public.trips
  for select using (
    driver_id in (select id from public.drivers where profile_id = auth.uid())
  );
drop policy if exists "staff_manage_trips" on public.trips;
create policy "staff_manage_trips" on public.trips
  for all using (public.has_role(array['ADMIN','OPERATIONS_MANAGER']));

-- Warehouses / inventory: widen Phase 1's admin-only read to all warehouse + ops staff
drop policy if exists "read_warehouses" on public.warehouses;
create policy "read_warehouses" on public.warehouses
  for select using (public.has_role(array['ADMIN','OPERATIONS_MANAGER','WAREHOUSE_MANAGER','WAREHOUSE_EMPLOYEE']));

drop policy if exists "staff_read_inventory" on public.inventory;
create policy "staff_read_inventory" on public.inventory
  for select using (public.has_role(array['ADMIN','WAREHOUSE_MANAGER','WAREHOUSE_EMPLOYEE']));
