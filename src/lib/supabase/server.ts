import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options?: {
              path?: string;
              domain?: string;
              httpOnly?: boolean;
              sameSite?: "lax" | "strict" | "none";
              secure?: boolean;
              maxAge?: number;
              expires?: number | Date;
            };
          }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component without a writable cookie store.
            // Safe to ignore when middleware also refreshes the session.
          }
        },
      },
    }
  );
}
