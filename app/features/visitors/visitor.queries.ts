import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/lib/supabase/supabase.types";

export async function getVisitorById(
  supabase: SupabaseClient<Database>,
  visitorId: string,
) {
  const { data, error } = await supabase
    .from("visitors")
    .select("*")
    .eq("id", visitorId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
