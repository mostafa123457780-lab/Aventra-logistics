import { createClient } from "@supabase/supabase-js";

// Service-role client — NEVER import this in a client component.
// Use it only inside Route Handlers / Server Actions for trusted writes
// (e.g. saving a public quote request) where you've already validated input.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
