# AVENTRA Logistics

## Phase 1 — Foundation

This phase includes:

- Next.js 14 (App Router) + TypeScript + Tailwind project setup
- Full folder structure for a role-based enterprise dashboard
- Supabase authentication (login, register, forgot/reset password)
- Role-Based Access Control (RBAC) with 7 roles: `CUSTOMER`, `ADMIN`,
  `OPERATIONS_MANAGER`, `ACCOUNTANT`, `WAREHOUSE_MANAGER`,
  `WAREHOUSE_EMPLOYEE`, `DRIVER`
- Middleware-based route protection
- Dashboard shell (sidebar navigation per role, header, sign-out)
- Working modules: Customer (overview, shipments, invoices, requests) and
  Admin (overview, shipments, invoices, customers, warehouses)
- Placeholder shells for Operations / Accountant / Warehouse / Driver —
  their real modules ship in Phase 2+
- `supabase/schema.sql` — the 10 confirmed tables with indexes, the
  `handle_new_user` signup trigger, and a rewritten RLS policy set that
  fixes the recursive-subquery performance issue from the previous schema

## Run locally

```bash
npm install
cp .env.example .env.local   # fill in your Supabase project URL + anon key
npm run dev
```

Open http://localhost:3000

## Apply the database schema

Run `supabase/schema.sql` (or `supabase/migrations/0001_initial_schema.sql`,
identical content) in the Supabase SQL editor. It is written with
`if not exists` / `or replace` / `drop policy if exists` everywhere, so it
is safe to re-run against a project that already has some of these tables —
it will not drop or duplicate existing data.

⚠️ It does **not** yet include `vehicles`, `drivers`, `payments`,
`containers`, or the other tables mentioned in the long-term roadmap —
those will be defined in Phase 2 once we confirm their exact column names
against your live project, to avoid guessing and creating a schema that
conflicts with data you already have.

## What's next (Phase 2+)

1. Vehicles, drivers, payments, containers tables + their dashboard pages
2. Operations / Accountant / Warehouse / Driver real modules
3. Cinematic marketing homepage (hero with headquarters/aircraft/ships imagery)
4. Reports & analytics
5. i18n (`ar` / `en`)
