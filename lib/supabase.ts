import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client.
 *
 * Uses the service role key, which bypasses Row Level Security.
 * This file must never be imported from a Client Component — it is
 * only ever used inside Route Handlers (app/api/**) which run on
 * the server.
 */
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase server environment variables are not configured. " +
        "Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
