import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/lib/supabase/supabase.types";

export async function createContact(
  supabaseClient: SupabaseClient<Database>,
  params: {
    email: string;
    visitor_id?: string;
    name?: string;
    phone?: string;
    city?: string;
    message?: string;
    source?: string;
  },
) {
  const { data, error } = await supabaseClient
    .from("contacts")
    .insert({
      ...params,
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}
