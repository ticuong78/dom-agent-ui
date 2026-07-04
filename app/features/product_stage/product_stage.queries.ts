import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/lib/supabase/supabase.types";

export async function getProductStage(
  supabaseClient: SupabaseClient<Database>,
) {
  const { data, error } = await supabaseClient
    .from("product_stage_history")
    .select("*")
    .order("created_at", { ascending: false })
    .single();

  if (error) throw error;

  return data;
}
