import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "~/lib/supabase/supabase.types";
import { getVisitorById, getVisitSessionById } from "./visitor.queries";
import {
  createVisitor,
  createVisitSession,
  updateVisitorTotalSessions,
} from "./visitor.mutations";

const VISITOR_ID_KEY = "visitor_id";
const VISIT_SESSION_ID_KEY = "visit_session_id";

export async function trackVisitSession(
  supabase: SupabaseClient<Database>,
  params: {
    landingPage: string;
  },
) {
  let visitorId = localStorage.getItem(VISITOR_ID_KEY);
  let visitor = null;

  if (visitorId) {
    visitor = await getVisitorById(supabase, visitorId);
  }

  if (!visitor || !visitorId) {
    localStorage.removeItem(VISITOR_ID_KEY);
    sessionStorage.removeItem(VISIT_SESSION_ID_KEY);

    visitor = await createVisitor(supabase);
    visitorId = visitor.id;

    localStorage.setItem(VISITOR_ID_KEY, visitorId);
  }

  const existingSessionId = sessionStorage.getItem(VISIT_SESSION_ID_KEY);

  if (existingSessionId) {
    const existingSession = await getVisitSessionById(supabase, {
      sessionId: existingSessionId,
      visitorId,
    });

    if (existingSession) {
      return {
        visitor,
        session: existingSession,
        createdNewSession: false,
      };
    }

    sessionStorage.removeItem(VISIT_SESSION_ID_KEY);
  }

  const newSession = await createVisitSession(supabase, {
    visitorId,
    landingPage: params.landingPage,
  });

  sessionStorage.setItem(VISIT_SESSION_ID_KEY, newSession.id);

  const totalSessions = (visitor.total_sessions ?? 0) + 1;

  const updatedVisitor = await updateVisitorTotalSessions(supabase, {
    visitorId,
    totalSessions,
  });

  return {
    visitor: updatedVisitor,
    session: newSession,
    createdNewSession: true,
  };
}
