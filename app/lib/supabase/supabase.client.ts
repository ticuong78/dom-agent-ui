import type { Database } from "./supabase.types";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing VITE_SUPABASE_URL");
}

if (!supabaseKey) {
  throw new Error("Missing VITE_SUPABASE_PUBLISHABLE_KEY");
}

export function createSupabaseBrowserClient() {
  return createBrowserClient<Database>(supabaseUrl, supabaseKey);
}
