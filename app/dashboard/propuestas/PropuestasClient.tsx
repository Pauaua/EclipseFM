"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { updateProposalStatus } from "@/lib/actions/proposals.actions";
import { createProgram } from "@/lib/actions/programs.actions";

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
  { key: "PROGRAM_IDEA", label: "Ideas de Programa", icon: "🎙️" },
  { key: "REFERRAL", label: "Referidos", icon: "👤" },
  { key: "SPONSOR_SUGGESTION", label: "Auspiciadores Sugeridos", icon: "🤝" },
] as const;

const STATUS_FILTERS = ["TODAS", "PENDING", "APPROVED", "REJECTED"] as const;

export function PropuestasClient({ initialProposals }: { initialProposals: Proposal[] }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [proposals, setProposals] = useState(initialProposals);
  const [activeTab, setActiveTab] = useState<"PROGRAM_IDEA" | "REFERRAL" | "SPONSOR_SUGGESTION">("PROGRAM_IDEA");
  const [statusFilter, setStatusFilter] = useState<string>("TODAS");
  const [notaModal, setNotaModal] = useState<{ id: string; nota: string } | null>(null);

  const filtered = proposals.filter(p => {
    if (p.tipo !== activeTab) return false;
    if (statusFilter !== "TODAS" && p.status !== statusFilter) return false;
    return true;
  });

  async function handleStatus(id: string, status: "APPROVED" | "REJECTED", nota?: string) {
    startTransition(async () => {
      const res = await updateProposalStatus(id, status, nota);
      if (res.success) {
        setProposals(prev => prev.map(p => p.id === id ? { ...p, status, adminNota: nota || p.adminNota } : p));
        toast(status === "APPROVED" ? "Propuesta aprobada" : "Propuesta rechazada");
        setNotaModal(null);
      }
    });
  }

  async function handleCreateProgram(p: Proposal) {
    if (!p.progTitulo) return;
    startTransition(async () => {
      const res = await createProgram({
        titulo: p.progTitulo!,
        descripcion: p.progDescripcion || "",
        conductor: p.progConductor || "Por definir",
        horarioInicio: p.progHorario?.split("-")[0]?.trim() || "00:00",
        horarioFin: p.progHorario?.split("-")[1]?.trim() || "00:00",
        dias: p.progDias ? p.progDias.split(",").map(d => d.trim()) : [],
        categoria: "ENTRETENIMIENTO",
      });
      if (res.success) toast("¡Programa creado desde la propuesta!");
      else toast(res.error || "Error", "error");
    });
  }

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-[#08041A] p-1 rounded-xl w-fit">
        {TABS.map(tab => {
          const count = proposals.filter(p => p.tipo === tab.key && p.status === "PENDING").length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
                activeTab === tab.key
                  ? "bg-[#1C1040] text-white border border-[rgba(124,58,237,0.3)]"
                  : "text-[#7B6FA0] hover:text-white"
              }`}
            >
              {tab.icon} {tab.label}
              {count > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Status filter */}
      <div className="flex gap-2 mb-4">
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

      {/* Cards */}
      <div className="space-y-3">
        {filtered.map(p => (
          <div key={p.id} className="bg-[#1C1040] border border-[rgba(168,85,247,0.1)] rounded-2xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge value={p.status} />
                  <span className="text-xs text-[#7B6FA0]">
                    {p.user.nombre} {p.user.apellido} · {new Date(p.createdAt).toLocaleDateString("es-CL")}
                  </span>
                </div>

                {/* Contenido según tipo */}
                {p.tipo === "PROGRAM_IDEA" && (
                  <div>
                    <h3 className="font-semibold text-white">{p.progTitulo || "Sin título"}</h3>
                    {p.progConductor && <p className="text-xs text-[#A89EC0]">Conductor: {p.progConductor}</p>}
                    {p.progDescripcion && <p className="text-sm text-[#A89EC0] mt-1">{p.progDescripcion}</p>}
                    {p.progHorario && <p className="text-xs text-[#7B6FA0] mt-0.5">Horario: {p.progHorario}</p>}
                    {p.progDias && <p className="text-xs text-[#7B6FA0]">Días: {p.progDias}</p>}
                  </div>
                )}
                {p.tipo === "REFERRAL" && (
                  <div>
                    <h3 className="font-semibold text-white">{p.refNombre || "Sin nombre"}</h3>
                    {p.refEmail && <p className="text-xs text-[#A89EC0]">📧 {p.refEmail}</p>}
                    {p.refTelefono && <p className="text-xs text-[#A89EC0]">📞 {p.refTelefono}</p>}
                    {p.refNota && <p className="text-sm text-[#A89EC0] mt-1">{p.refNota}</p>}
                  </div>
                )}
                {p.tipo === "SPONSOR_SUGGESTION" && (
                  <div>
                    <h3 className="font-semibold text-white">{p.sponEmpresa || "Sin empresa"}</h3>
                    {p.sponContacto && <p className="text-xs text-[#A89EC0]">Contacto: {p.sponContacto}</p>}
                    {p.sponEmail && <p className="text-xs text-[#A89EC0]">📧 {p.sponEmail}</p>}
                    {p.sponNota && <p className="text-sm text-[#A89EC0] mt-1">{p.sponNota}</p>}
                  </div>
                )}

                {p.adminNota && (
                  <div className="mt-2 px-3 py-2 bg-[rgba(124,58,237,0.1)] rounded-lg border border-[rgba(124,58,237,0.2)]">
                    <p className="text-xs text-[#A89EC0]">📝 Nota admin: {p.adminNota}</p>
                  </div>
                )}
              </div>
            </div>

            {p.status === "PENDING" && (
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="secondary"
                  className="text-xs border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                  onClick={() => handleStatus(p.id, "APPROVED")}
                  loading={isPending}
                >
                  ✓ Aprobar
                </Button>
                <Button
                  variant="danger"
                  className="text-xs"
                  onClick={() => handleStatus(p.id, "REJECTED")}
                  loading={isPending}
                >
                  ✕ Rechazar
                </Button>
                <Button
                  variant="ghost"
                  className="text-xs"
                  onClick={() => setNotaModal({ id: p.id, nota: p.adminNota || "" })}
                >
                  📝 Nota
                </Button>
                {p.tipo === "PROGRAM_IDEA" && (
                  <Button
                    variant="ghost"
                    className="text-xs text-purple-bright"
                    onClick={() => handleCreateProgram(p)}
                    loading={isPending}
                  >
                    📻 Crear programa
                  </Button>
                )}
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#7B6FA0]">No hay propuestas que mostrar.</div>
        )}
      </div>

      {/* Nota modal */}
      <Modal open={!!notaModal} onClose={() => setNotaModal(null)} title="Agregar nota" size="sm">
        {notaModal && (
          <div className="space-y-4">
            <Textarea
              label="Nota para el equipo"
              value={notaModal.nota}
              onChange={e => setNotaModal(n => n ? { ...n, nota: e.target.value } : n)}
              rows={4}
            />
            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setNotaModal(null)}>Cancelar</Button>
              <Button
                onClick={() => handleStatus(notaModal.id, "APPROVED", notaModal.nota)}
                loading={isPending}
              >
                Aprobar con nota
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
