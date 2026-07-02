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

export async function getVisitSessionById(
  supabase: SupabaseClient<Database>,
  params: {
    sessionId: string;
    visitorId: string;
  },
) {
  const { data, error } = await supabase
    .from("visit_sessions")
    .select("*")
    .eq("id", params.sessionId)
    .eq("visitor_id", params.visitorId)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
}
