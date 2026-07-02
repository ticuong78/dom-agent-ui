import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/lib/supabase/supabase.types";
import { getVisitorById } from "./visitor.queries";
import {
  createVisitor,
  createVisitSession,
  updateVisitorTotalSessions,
} from "./visitor.mutations";

export async function trackVisitSession(
  supabase: SupabaseClient<Database>,
  params: {
    landingPage: string;
  },
) {
  let visitorId = localStorage.getItem("visitor_id");
  let visitor = null;

  if (visitorId) {
    visitor = await getVisitorById(supabase, visitorId);
  }

  if (!visitor || !visitorId) {
    visitor = await createVisitor(supabase);
    visitorId = visitor.id;
    localStorage.setItem("visitor_id", visitorId);
  }

  const existingSessionId = sessionStorage.getItem("visit_session_id");

  if (existingSessionId) {
    return {
      visitor,
      sessionId: existingSessionId,
      createdNewSession: false,
    };
  }

  const session = await createVisitSession(supabase, {
    visitorId,
    landingPage: params.landingPage,
  });

  sessionStorage.setItem("visit_session_id", session.id);

  const totalSessions = (visitor.total_sessions ?? 0) + 1;

  const updatedVisitor = await updateVisitorTotalSessions(supabase, {
    visitorId,
    totalSessions,
  });

  return {
    visitor: updatedVisitor,
    session,
    createdNewSession: true,
  };
}
