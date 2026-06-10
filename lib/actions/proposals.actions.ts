"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { ProposalType, ProposalStatus } from "@prisma/client";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const programIdeaSchema = z.object({
  tipo: z.literal(ProposalType.PROGRAM_IDEA),
  progTitulo: z.string().min(1, "Título requerido"),
  progConductor: z.string().optional(),
  progDescripcion: z.string().optional(),
  progHorario: z.string().optional(),
  progDias: z.string().optional(),
});

const referralSchema = z.object({
  tipo: z.literal(ProposalType.REFERRAL),
  refNombre: z.string().min(1, "Nombre requerido"),
  refEmail: z.string().email().optional().or(z.literal("")),
  refTelefono: z.string().optional(),
  refNota: z.string().optional(),
});

const sponsorSuggestionSchema = z.object({
  tipo: z.literal(ProposalType.SPONSOR_SUGGESTION),
  sponEmpresa: z.string().min(1, "Empresa requerida"),
  sponContacto: z.string().optional(),
  sponEmail: z.string().email().optional().or(z.literal("")),
  sponNota: z.string().optional(),
});

const proposalSchema = z.discriminatedUnion("tipo", [
  programIdeaSchema,
  referralSchema,
  sponsorSuggestionSchema,
]);

const PROPOSAL_LABELS: Record<ProposalType, string> = {
  PROGRAM_IDEA: "Idea de programa",
  REFERRAL: "Referido",
  SPONSOR_SUGGESTION: "Sugerencia de auspiciador",
};

export async function createProposal(data: z.infer<typeof proposalSchema>) {
  const session = await auth();
  if (!session) return { success: false, error: "No autorizado" };

  const parsed = proposalSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message };

  const proposal = await prisma.proposal.create({
    data: { ...parsed.data, userId: session.user.id },
  });

  // Notificar al admin por email (sin bloquear la respuesta)
  const tipoLabel = PROPOSAL_LABELS[parsed.data.tipo];
  const autorNombre = `${session.user.nombre} ${session.user.apellido}`;
  resend.emails.send({
    from: "Eclipse FM <contacto@radioeclipsefm.cl>",
    to: "radioeclipsefm@hotmail.com",
    subject: `[Nueva propuesta] ${tipoLabel} — ${autorNombre}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#08041A;color:#E2D9F3;padding:32px;border-radius:12px;border:1px solid rgba(124,58,237,0.2)">
        <h2 style="color:#E8D44D;font-size:20px;margin-bottom:4px">Eclipse FM — Nueva propuesta</h2>
        <p style="color:#7B6FA0;font-size:13px;margin-top:0;margin-bottom:24px">Recibiste una nueva propuesta desde el panel de equipo</p>
        <table style="width:100%;border-collapse:collapse">
          <tr>
            <td style="padding:8px 0;color:#7B6FA0;font-size:12px;width:120px">TIPO</td>
            <td style="padding:8px 0;color:#E8D44D;font-size:14px;font-weight:bold">${tipoLabel}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:#7B6FA0;font-size:12px">ENVIADO POR</td>
            <td style="padding:8px 0;color:#E2D9F3;font-size:14px">${autorNombre} (${session.user.email})</td>
          </tr>
        </table>
        <div style="margin-top:24px;padding:16px;background:rgba(124,58,237,0.08);border-radius:8px;border:1px solid rgba(124,58,237,0.15)">
          <p style="color:#7B6FA0;font-size:12px;margin:0 0 8px">DETALLE</p>
          <pre style="color:#E2D9F3;font-size:13px;white-space:pre-wrap;margin:0;font-family:inherit">${JSON.stringify(parsed.data, null, 2).replace(/[{}",]/g, "").trim()}</pre>
        </div>
        <p style="color:#4B4270;font-size:12px;margin-top:24px">
          Revisa y gestiona esta propuesta en el panel: <a href="${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.radioeclipsefm.cl"}/dashboard/propuestas" style="color:#7C3AED">Ver propuestas</a>
        </p>
      </div>
    `,
  }).catch(() => {}); // silencioso — no bloquea si falla el email

  return { success: true, data: proposal };
}

export async function getProposals(tipo?: ProposalType, status?: ProposalStatus) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") throw new Error("No autorizado");
  return prisma.proposal.findMany({
    where: {
      ...(tipo && { tipo }),
      ...(status && { status }),
    },
    include: { user: { select: { nombre: true, apellido: true, email: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function updateProposalStatus(
  id: string,
  status: ProposalStatus,
  adminNota?: string
) {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") return { success: false, error: "No autorizado" };

  const proposal = await prisma.proposal.update({
    where: { id },
    data: { status, ...(adminNota !== undefined && { adminNota }) },
  });
  return { success: true, data: proposal };
}

export async function getPendingProposalsCount() {
  return prisma.proposal.count({ where: { status: "PENDING" } });
}

export async function getDashboardStats() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") throw new Error("No autorizado");

  const [usuarios, programas, auspiciadores, propuestas] = await Promise.all([
    prisma.user.count({ where: { status: "ACTIVE" } }),
    prisma.program.count({ where: { activo: true } }),
    prisma.sponsor.count({ where: { activo: true } }),
    prisma.proposal.count({ where: { status: "PENDING" } }),
  ]);

  return { usuarios, programas, auspiciadores, propuestas };
}
