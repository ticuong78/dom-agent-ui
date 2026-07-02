import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/lib/supabase/supabase.types";

export async function createVisitor(supabase: SupabaseClient<Database>) {
  const { data, error } = await supabase
    .from("visitors")
    .insert({})
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function createVisitSession(
  supabase: SupabaseClient<Database>,
  params: {
    visitorId: string;
    landingPage: string;
  },
) {
  const { data, error } = await supabase
    .from("visit_sessions")
    .insert({
      visitor_id: params.visitorId,
      landing_page: params.landingPage,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateVisitorTotalSessions(
  supabase: SupabaseClient<Database>,
  params: {
    visitorId: string;
    totalSessions: number;
  },
) {
  const { data, error } = await supabase
    .from("visitors")
    .update({
      total_sessions: params.totalSessions,
    })
    .eq("id", params.visitorId)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return data;
}
