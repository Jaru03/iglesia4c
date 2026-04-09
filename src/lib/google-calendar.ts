/**
 * Generador de URLs de Google Calendar
 *
 * Usa el formato estándar de "deep link" de Google Calendar
 * (action=TEMPLATE). No requiere OAuth ni API keys — abre Google
 * Calendar con el evento pre-rellenado y el usuario lo guarda con
 * un clic. Es el mismo método que usan Calendly, Airbnb, etc.
 *
 * Para la integración automática vía API (crear eventos sin
 * interacción del usuario) ver las recomendaciones al final del archivo.
 */

export interface GoogleCalendarEvent {
  title: string;
  /** ISO string o Date */
  startDate: string | Date;
  /** ISO string o Date */
  endDate: string | Date;
  description?: string;
  location?: string;
}

/**
 * Formatea una fecha + hora ("HH:MM") a `YYYYMMDDTHHmmSS`
 * que Google Calendar entiende como hora local.
 */
function formatLocalDateTime(dateStr: string, timeStr: string): string {
  // dateStr: "2026-04-20" — timeStr: "10:00"
  const [year, month, day] = dateStr.split("-");
  const [hour, minute] = timeStr.split(":");
  return `${year}${month}${day}T${hour}${minute}00`;
}

/**
 * Formatea un Date/ISO string a `YYYYMMDD` (evento de día completo).
 */
function formatAllDay(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(d.getUTCDate()).padStart(2, "0");
  return `${y}${m}${dd}`;
}

/**
 * Genera la URL de Google Calendar para una cita con hora exacta.
 *
 * @example
 * buildAppointmentCalendarUrl({
 *   dateStr: "2026-04-20",
 *   startTime: "10:00",
 *   endTime: "12:00",
 *   responsableName: "Ana López",
 *   notes: "Consulta pastoral",
 * })
 */
export function buildAppointmentCalendarUrl({
  dateStr,
  startTime,
  endTime,
  responsableName,
  notes,
}: {
  dateStr: string;
  startTime: string;
  endTime: string;
  responsableName: string;
  notes?: string | null;
}): string {
  const start = formatLocalDateTime(dateStr, startTime);
  const end = formatLocalDateTime(dateStr, endTime);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Cita con ${responsableName}`,
    dates: `${start}/${end}`,
    details: [
      `Cita confirmada con ${responsableName}.`,
      notes ? `\nNotas: ${notes}` : "",
    ]
      .filter(Boolean)
      .join(""),
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Genera la URL de Google Calendar para una asignación de equipo
 * (evento de día completo).
 *
 * @example
 * buildAssignmentCalendarUrl({
 *   dateIso: "2026-04-20T00:00:00.000Z",
 *   task: "Alabanza",
 *   departmentName: "Jóvenes",
 *   notes: "Llevar guitarra",
 * })
 */
export function buildAssignmentCalendarUrl({
  dateIso,
  task,
  departmentName,
  notes,
}: {
  dateIso: string;
  task?: string | null;
  departmentName: string;
  notes?: string | null;
}): string {
  const day = formatAllDay(dateIso);
  // Google Calendar all-day: dates=YYYYMMDD/YYYYMMDD (fin = día siguiente)
  const nextDay = formatAllDay(
    new Date(new Date(dateIso).getTime() + 86_400_000)
  );

  const title = task
    ? `${task} — ${departmentName}`
    : `Servicio — ${departmentName}`;

  const details = [
    `Asignación en el departamento ${departmentName}.`,
    task ? `Tarea: ${task}` : "",
    notes ? `Notas: ${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: `${day}/${nextDay}`,
    details,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// RECOMENDACIONES PARA INTEGRACIÓN AUTOMÁTICA VÍA API (sin interacción)
// ─────────────────────────────────────────────────────────────────────────────
//
// Para guardar eventos automáticamente en el calendario del usuario sin
// que tenga que hacer clic, necesitas OAuth2 con el scope de Google Calendar:
//
// 1. CONFIGURA GOOGLE CLOUD CONSOLE
//    - Crea un proyecto en https://console.cloud.google.com
//    - Activa la "Google Calendar API"
//    - Crea credenciales OAuth 2.0 (tipo "Web application")
//    - Añade al .env:
//        GOOGLE_CLIENT_ID=...
//        GOOGLE_CLIENT_SECRET=...
//
// 2. AÑADE EL PROVEEDOR DE GOOGLE EN NEXTAUTH (src/lib/auth.ts)
//    - Importa GoogleProvider desde "next-auth/providers/google"
//    - Añádelo junto al CredentialsProvider existente
//    - Scope requerido: "https://www.googleapis.com/auth/calendar"
//    - En el callback jwt, guarda access_token y refresh_token en el token
//
// 3. EXTIENDE EL MODELO User EN PRISMA (prisma/schema.prisma)
//    - Añade: googleAccessToken  String?
//             googleRefreshToken String?
//             googleTokenExpiry  DateTime?
//    - Guarda los tokens en el callback signIn de NextAuth
//
// 4. CREA src/lib/google-calendar-api.ts
//    - Usa el paquete `googleapis` (pnpm add googleapis)
//    - Función: createGoogleCalendarEvent(userId, eventData)
//      · Recupera tokens del usuario desde Prisma
//      · Refresca el token si ha expirado
//      · Llama a calendar.events.insert({ calendarId: "primary", resource: event })
//
// 5. PUNTOS DE INTEGRACIÓN (dónde llamar a createGoogleCalendarEvent):
//    A) src/app/api/appointments/[id]/route.ts
//       → En el PATCH, cuando status === "CONFIRMED":
//         - Busca los emails/userId de ambas partes
//         - Llama a createGoogleCalendarEvent para el userId del solicitante
//         - Llama a createGoogleCalendarEvent para el responsableId
//    B) src/app/api/team-calendar/[calendarId]/entries/route.ts
//       → En el POST (nueva entrada de calendario de equipo):
//         - Si entry.userId existe, llama a createGoogleCalendarEvent
//    C) src/actions/cultos-actions.ts (si aplica)
//       → Al crear/editar un culto
//
// ─────────────────────────────────────────────────────────────────────────────
