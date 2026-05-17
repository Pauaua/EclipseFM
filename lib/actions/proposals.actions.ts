"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { ProposalType, ProposalStatus } from "@prisma/client";

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

export async function createProposal(data: z.infer<typeof proposalSchema>) {
  const session = await auth();
  if (!session) return { success: false, error: "No autorizado" };

  const parsed = proposalSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message };

  const proposal = await prisma.proposal.create({
    data: { ...parsed.data, userId: session.user.id },
  });
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
