import prisma from "@/utils/prisma";
import { requireMobileAuth } from "@/lib/auth-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const POLL_INTERVAL_MS = 3000;

type Arrival = { id: number; name: string; lastname: string; arrivedAt: Date | null };

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function endOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Live feed of today's visitor check-ins (name + lastname only), for the
 * Expo app's "invitados" screen. Implemented as Server-Sent Events with
 * short-interval polling on top of the existing Person table -- no schema
 * changes, no direct client access to the database.
 *
 * We deliberately don't use Supabase Realtime here: `postgres_changes`
 * broadcasts the full row over the WAL regardless of RLS/column grants, which
 * would leak email/phone/document/prayerRequest/signature to anyone holding
 * the public anon key.
 */
export async function GET(req: Request) {
  const auth = requireMobileAuth(req);
  if (!auth.ok) return auth.response;

  const encoder = new TextEncoder();
  let lastSeenId = 0;
  let closed = false;

  const fetchToday = (afterId = 0) =>
    prisma.person.findMany({
      where: {
        membershipStatus: "VISITOR",
        arrivedAt: { gte: startOfDay(new Date()), lte: endOfDay(new Date()) },
        id: { gt: afterId },
      },
      select: { id: true, name: true, lastname: true, arrivedAt: true },
      orderBy: { id: "asc" },
    });

  const stream = new ReadableStream({
    async start(controller) {
      const send = (event: string, data: Arrival[] | Arrival) => {
        controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));
      };

      try {
        const initial = await fetchToday();
        lastSeenId = initial.reduce((max, p) => Math.max(max, p.id), 0);
        send("snapshot", initial);
      } catch (error) {
        console.error("[arrivals-stream] snapshot error:", error);
      }

      const interval = setInterval(async () => {
        if (closed) return;
        try {
          const latest = await fetchToday(lastSeenId);
          for (const person of latest) {
            lastSeenId = Math.max(lastSeenId, person.id);
            send("arrival", person);
          }
        } catch (error) {
          console.error("[arrivals-stream] poll error:", error);
        }
      }, POLL_INTERVAL_MS);

      req.signal.addEventListener("abort", () => {
        closed = true;
        clearInterval(interval);
        try {
          controller.close();
        } catch {
          // already closed
        }
      });
    },
    cancel() {
      closed = true;
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
