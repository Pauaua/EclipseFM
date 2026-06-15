"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/Badge";

type Proposal = {
  id: string;
  tipo: "PROGRAM_IDEA" | "REFERRAL" | "SPONSOR_SUGGESTION";
  status: "PENDING" | "APPROVED" | "REJECTED";
  adminNota: string | null;
  user: { nombre: string; apellido: string; email: string };
  createdAt: Date;
  progTitulo: string | null;
  progDescripcion: string | null;
  progHorario: string | null;
  progDias: string | null;
  progConductor: string | null;
  refNombre: string | null;
  refEmail: string | null;
  refTelefono: string | null;
  refNota: string | null;
  sponEmpresa: string | null;
  sponContacto: string | null;
  sponEmail: string | null;
  sponNota: string | null;
};

const TABS = [
  { key: "PROGRAM_IDEA", label: "Ideas de Programa" },
  { key: "REFERRAL", label: "Referidos" },
  { key: "SPONSOR_SUGGESTION", label: "Auspiciadores Sugeridos" },
] as const;

const STATUS_FILTERS = ["TODAS", "PENDING", "APPROVED", "REJECTED"] as const;

export function PropuestasReadOnly({ initialProposals }: { initialProposals: Proposal[] }) {
  const [activeTab, setActiveTab] = useState<"PROGRAM_IDEA" | "REFERRAL" | "SPONSOR_SUGGESTION">("PROGRAM_IDEA");
  const [statusFilter, setStatusFilter] = useState<string>("TODAS");

  const filtered = initialProposals.filter(p => {
    if (p.tipo !== activeTab) return false;
    if (statusFilter !== "TODAS" && p.status !== statusFilter) return false;
    return true;
  });

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-[#08041A] p-1 rounded-xl w-fit overflow-x-auto">
        {TABS.map(tab => {
          const count = initialProposals.filter(p => p.tipo === tab.key && p.status === "PENDING").length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-[#1C1040] text-white border border-[rgba(124,58,237,0.3)]"
                  : "text-[#7B6FA0] hover:text-white"
              }`}
            >
              {tab.label}
              {count > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Filtro estado */}
      <div className="flex flex-wrap gap-2 mb-4">
        {STATUS_FILTERS.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              statusFilter === s
                ? "bg-[#E8D44D] text-[#0D0825]"
                : "bg-[rgba(124,58,237,0.1)] text-[#A89EC0] border border-[rgba(124,58,237,0.2)]"
            }`}
          >
            {s === "TODAS" ? "Todas" : s === "PENDING" ? "Pendientes" : s === "APPROVED" ? "Aprobadas" : "Rechazadas"}
          </button>
        ))}
      </div>

      {/* Cards solo lectura */}
      <div className="space-y-3">
        {filtered.map(p => (
          <div key={p.id} className="bg-[#1C1040] border border-[rgba(168,85,247,0.1)] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Badge value={p.status} />
              <span className="text-xs text-[#7B6FA0]">
                {p.user.nombre} {p.user.apellido} · {new Date(p.createdAt).toLocaleDateString("es-CL")}
              </span>
            </div>

            {p.tipo === "PROGRAM_IDEA" && (
              <div>
                <h3 className="font-semibold text-white">{p.progTitulo || "Sin titulo"}</h3>
                {p.progConductor && <p className="text-xs text-[#A89EC0]">Conductor: {p.progConductor}</p>}
                {p.progDescripcion && <p className="text-sm text-[#A89EC0] mt-1">{p.progDescripcion}</p>}
                {p.progHorario && <p className="text-xs text-[#7B6FA0] mt-0.5">Horario: {p.progHorario}</p>}
                {p.progDias && <p className="text-xs text-[#7B6FA0]">Dias: {p.progDias}</p>}
              </div>
            )}
            {p.tipo === "REFERRAL" && (
              <div>
                <h3 className="font-semibold text-white">{p.refNombre || "Sin nombre"}</h3>
                {p.refEmail && <p className="text-xs text-[#A89EC0]">{p.refEmail}</p>}
                {p.refTelefono && <p className="text-xs text-[#A89EC0]">{p.refTelefono}</p>}
                {p.refNota && <p className="text-sm text-[#A89EC0] mt-1">{p.refNota}</p>}
              </div>
            )}
            {p.tipo === "SPONSOR_SUGGESTION" && (
              <div>
                <h3 className="font-semibold text-white">{p.sponEmpresa || "Sin empresa"}</h3>
                {p.sponContacto && <p className="text-xs text-[#A89EC0]">Contacto: {p.sponContacto}</p>}
                {p.sponEmail && <p className="text-xs text-[#A89EC0]">{p.sponEmail}</p>}
                {p.sponNota && <p className="text-sm text-[#A89EC0] mt-1">{p.sponNota}</p>}
              </div>
            )}

            {p.adminNota && (
              <div className="mt-2 px-3 py-2 bg-[rgba(124,58,237,0.1)] rounded-lg border border-[rgba(124,58,237,0.2)]">
                <p className="text-xs text-[#A89EC0]">Nota admin: {p.adminNota}</p>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#7B6FA0]">No hay propuestas que mostrar.</div>
        )}
      </div>
    </div>
  );
}
