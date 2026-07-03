import nodemailer from "nodemailer";

/** Transporte SMTP compartido (Gmail por defecto). Fuente única de configuración. */
export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST ?? "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT ?? 587),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER ?? "placeholder@email.com",
    pass: process.env.EMAIL_PASS ?? "placeholder-password",
  },
});

/** Remitente por defecto para todos los emails de la app. */
export const EMAIL_FROM = process.env.EMAIL_FROM ?? "Iglesia <no-reply@iglesia.com>";

const FROM = EMAIL_FROM;

export interface AppointmentEmailData {
  toName: string;
  toEmail: string;
  responsableName: string;
  date: string;     // "Lunes 20 de marzo de 2026"
  startTime: string; // "10:00"
  endTime: string;   // "10:30"
  notes?: string;
}

export async function sendConfirmationEmail(data: AppointmentEmailData) {
  await transporter.sendMail({
    from: FROM,
    to: data.toEmail,
    subject: "Confirmación de cita",
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
        <h2>Cita confirmada</h2>
        <p>Hola <strong>${data.toName}</strong>,</p>
        <p>Tu cita con <strong>${data.responsableName}</strong> ha sido registrada.</p>
        <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Fecha</strong></td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.date}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Hora</strong></td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.startTime} – ${data.endTime}</td>
          </tr>
          ${data.notes ? `<tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Notas</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${data.notes}</td></tr>` : ""}
        </table>
        <p>Si necesitas cancelar, hazlo con antelación a través de la plataforma.</p>
      </div>
    `,
  });
}

export async function sendConfirmationToResponsable(data: AppointmentEmailData & { responsableEmail: string }) {
  await transporter.sendMail({
    from: FROM,
    to: data.responsableEmail,
    subject: "Nueva cita agendada",
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
        <h2>Nueva cita</h2>
        <p>Hola <strong>${data.responsableName}</strong>,</p>
        <p><strong>${data.toName}</strong> ha agendado una cita contigo.</p>
        <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Fecha</strong></td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.date}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Hora</strong></td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.startTime} – ${data.endTime}</td>
          </tr>
          ${data.notes ? `<tr><td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Notas</strong></td><td style="padding: 8px; border: 1px solid #e5e7eb;">${data.notes}</td></tr>` : ""}
        </table>
      </div>
    `,
  });
}

export async function sendReminderEmail(data: AppointmentEmailData) {
  await transporter.sendMail({
    from: FROM,
    to: data.toEmail,
    subject: "Recordatorio: tienes una cita mañana",
    html: `
      <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
        <h2>Recordatorio de cita</h2>
        <p>Hola <strong>${data.toName}</strong>,</p>
        <p>Te recordamos que mañana tienes una cita con <strong>${data.responsableName}</strong>.</p>
        <table style="border-collapse: collapse; width: 100%; margin: 16px 0;">
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Fecha</strong></td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.date}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border: 1px solid #e5e7eb;"><strong>Hora</strong></td>
            <td style="padding: 8px; border: 1px solid #e5e7eb;">${data.startTime} – ${data.endTime}</td>
          </tr>
        </table>
      </div>
    `,
  });
}
