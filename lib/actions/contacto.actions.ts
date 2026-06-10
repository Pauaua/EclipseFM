"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactoData = {
  nombre: string;
  email: string;
  asunto: string;
  mensaje: string;
};

const ASUNTOS: Record<string, string> = {
  publicidad: "Publicidad / Auspicios",
  propuesta: "Propuesta de programa",
  prensa: "Prensa / Periodismo",
  general: "Consulta general",
  otro: "Otro",
};

export async function enviarContacto(data: ContactoData) {
  const { nombre, email, asunto, mensaje } = data;

  if (!nombre || !email || !asunto || !mensaje) {
    return { success: false, error: "Todos los campos son requeridos." };
  }

  try {
    await resend.emails.send({
      from: "Eclipse FM <contacto@radioeclipsefm.cl>",
      to: "radioeclipsefm@hotmail.com",
      replyTo: email,
      subject: `[Contacto Web] ${ASUNTOS[asunto] ?? asunto} — ${nombre}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#08041A;color:#E2D9F3;padding:32px;border-radius:12px;border:1px solid rgba(124,58,237,0.2)">
          <h2 style="color:#E8D44D;font-size:22px;margin-bottom:4px">Eclipse FM 107.7</h2>
          <p style="color:#7B6FA0;font-size:13px;margin-top:0;margin-bottom:24px">Nuevo mensaje desde el formulario de contacto</p>

          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:8px 0;color:#7B6FA0;font-size:12px;width:100px">NOMBRE</td>
              <td style="padding:8px 0;color:#E2D9F3;font-size:14px">${nombre}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#7B6FA0;font-size:12px">EMAIL</td>
              <td style="padding:8px 0;color:#E2D9F3;font-size:14px"><a href="mailto:${email}" style="color:#E8D44D">${email}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#7B6FA0;font-size:12px">ASUNTO</td>
              <td style="padding:8px 0;color:#E2D9F3;font-size:14px">${ASUNTOS[asunto] ?? asunto}</td>
            </tr>
          </table>

          <div style="margin-top:20px;padding:16px;background:rgba(124,58,237,0.08);border-radius:8px;border:1px solid rgba(124,58,237,0.15)">
            <p style="color:#7B6FA0;font-size:12px;margin:0 0 8px">MENSAJE</p>
            <p style="color:#E2D9F3;font-size:14px;line-height:1.7;margin:0;white-space:pre-wrap">${mensaje}</p>
          </div>

          <p style="color:#4B4270;font-size:11px;margin-top:24px;margin-bottom:0">Puedes responder directamente a este email para contactar a ${nombre}.</p>
        </div>
      `,
    });

    return { success: true };
  } catch (err) {
    console.error("[Resend] Error al enviar email de contacto:", err);
    return { success: false, error: "No se pudo enviar el mensaje. Intenta nuevamente." };
  }
}
