import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/lib/supabase/supabase.types";

export async function getContactById(
  supabase: SupabaseClient<Database>,
  contactID: string,
) {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", contactID)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
