"use client";

import { useState, useTransition } from "react";
import { checkStreaming, type StreamStatus } from "@/lib/actions/streaming.actions";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { createProposal } from "@/lib/actions/proposals.actions";

type StreamingResults = { radio: StreamStatus; tv: StreamStatus };

type Program = {
  id: string;
  titulo: string;
  descripcion: string;
  conductor: string;
  horarioInicio: string;
  horarioFin: string;
  dias: string[];
  categoria: string;
};

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export function TeamPageClient({
  userName,
  userId,
  programs,
  streaming: initialStreaming,
}: {
  userName: string;
  userId: string;
  programs: Program[];
  streaming: StreamingResults;
}) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [openModal, setOpenModal] = useState<"idea" | "referral" | "sponsor" | null>(null);
  const [streaming, setStreaming] = useState<StreamingResults>(initialStreaming);
  const [checkingStream, setCheckingStream] = useState(false);

  function refreshStreaming() {
    setCheckingStream(true);
    startTransition(async () => {
      const fresh = await checkStreaming();
      setStreaming(fresh);
      setCheckingStream(false);
    });
  }

  // Forms
  const [ideaForm, setIdeaForm] = useState({ progTitulo: "", progConductor: "", progDescripcion: "", progHorario: "", progDias: [] as string[] });
  const [refForm, setRefForm] = useState({ refNombre: "", refEmail: "", refTelefono: "", refNota: "" });
  const [sponForm, setSponForm] = useState({ sponEmpresa: "", sponContacto: "", sponEmail: "", sponNota: "" });

  function toggleDia(dia: string) {
    setIdeaForm(f => ({
      ...f,
      progDias: f.progDias.includes(dia) ? f.progDias.filter(d => d !== dia) : [...f.progDias, dia],
    }));
  }

  async function submitIdea(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await createProposal({
        tipo: "PROGRAM_IDEA",
        progTitulo: ideaForm.progTitulo,
        progConductor: ideaForm.progConductor,
        progDescripcion: ideaForm.progDescripcion,
        progHorario: ideaForm.progHorario,
        progDias: ideaForm.progDias.join(", "),
      });
      if (res.success) { toast("¡Propuesta enviada exitosamente!"); setOpenModal(null); setIdeaForm({ progTitulo: "", progConductor: "", progDescripcion: "", progHorario: "", progDias: [] }); }
      else toast(res.error || "Error", "error");
    });
  }

  async function submitReferral(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await createProposal({ tipo: "REFERRAL", ...refForm });
      if (res.success) { toast("¡Referido enviado!"); setOpenModal(null); setRefForm({ refNombre: "", refEmail: "", refTelefono: "", refNota: "" }); }
      else toast(res.error || "Error", "error");
    });
  }

  async function submitSponsor(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await createProposal({ tipo: "SPONSOR_SUGGESTION", ...sponForm });
      if (res.success) { toast("¡Sugerencia enviada!"); setOpenModal(null); setSponForm({ sponEmpresa: "", sponContacto: "", sponEmail: "", sponNota: "" }); }
      else toast(res.error || "Error", "error");
    });
  }

  const actionCards = [
    {
      key: "idea" as const,
      icon: "🎙️",
      title: "Proponer idea de programa",
      description: "¿Tienes una idea para un nuevo programa? Compártela con el equipo directivo.",
      accentClass: "border-[rgba(168,85,247,0.3)] hover:border-[rgba(168,85,247,0.6)]",
      iconBg: "bg-purple-500/10",
    },
    {
      key: "referral" as const,
      icon: "👤",
      title: "Indicar un referido",
      description: "¿Conoces a alguien que podría sumarse al equipo de Eclipse FM?",
      accentClass: "border-[rgba(232,212,77,0.3)] hover:border-[rgba(232,212,77,0.6)]",
      iconBg: "bg-yellow-500/10",
    },
    {
      key: "sponsor" as const,
      icon: "🤝",
      title: "Proponer auspiciador",
      description: "¿Conoces una empresa que podría auspiciarnos? Danos sus datos.",
      accentClass: "border-[rgba(52,211,153,0.3)] hover:border-[rgba(52,211,153,0.6)]",
      iconBg: "bg-emerald-500/10",
    },
  ];

  return (
    <div>
      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Hola, <span className="text-[#E8D44D]">{userName}</span>. 👋
        </h1>
        <p className="text-[#7B6FA0] mt-1">Bienvenido al panel de Eclipse FM 107.7</p>
      </div>

      {/* Streaming status widget */}
      <div
        className="rounded-2xl p-5 mb-8"
        style={{ background: "#1C1040", border: "1px solid rgba(168,85,247,0.15)" }}
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-white font-semibold text-sm">Estado del Streaming</p>
          <button
            onClick={refreshStreaming}
            disabled={checkingStream}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all disabled:opacity-50"
            style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.25)", color: "#A89EC0" }}
          >
            <span className={checkingStream ? "animate-spin inline-block" : ""}>↻</span>
            {checkingStream ? "Verificando..." : "Actualizar"}
          </button>
        </div>
        <div className="flex flex-wrap gap-6">
          {[
            { label: "📻 Radio", status: streaming.radio },
            { label: "📺 Eclipse TV", status: streaming.tv },
          ].map(({ label, status }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-[#7B6FA0] text-sm">{label}</span>
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: status.online ? "#34D399" : "#F87171",
                  boxShadow: status.online ? "0 0 6px rgba(52,211,153,0.6)" : "0 0 6px rgba(248,113,113,0.4)",
                }}
              />
              <span className="text-xs font-semibold" style={{ color: status.online ? "#34D399" : "#F87171" }}>
                {status.online ? "En línea" : "Sin señal"}
              </span>
              {status.latency !== null && (
                <span className="text-[#7B6FA0] text-xs">{status.latency}ms</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {actionCards.map(card => (
          <button
            key={card.key}
            onClick={() => setOpenModal(card.key)}
            className={`text-left p-6 bg-[#1C1040] border rounded-2xl transition-all duration-200 hover:bg-[#200D4A] group ${card.accentClass}`}
          >
            <div className={`w-12 h-12 rounded-xl ${card.iconBg} flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
              {card.icon}
            </div>
            <h3 className="font-semibold text-white mb-2">{card.title}</h3>
            <p className="text-[#7B6FA0] text-sm leading-relaxed">{card.description}</p>
            <p className="text-[#A89EC0] text-xs mt-4 font-medium">Enviar →</p>
          </button>
        ))}
      </div>

      {/* Programs grid */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Nuestra Programación</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {programs.map(p => (
            <div key={p.id} className="bg-[#1C1040] border border-[rgba(168,85,247,0.1)] rounded-2xl p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-white">{p.titulo}</h3>
                <Badge value={p.categoria} />
              </div>
              <p className="text-xs text-[#A89EC0] mb-3">🎙 {p.conductor}</p>
              <p className="text-xs text-[#7B6FA0] mb-3 line-clamp-2">{p.descripcion}</p>
              <div className="text-xs text-[#A89EC0] space-y-1 pt-3 border-t border-[rgba(124,58,237,0.1)]">
                <p>⏰ {p.horarioInicio} – {p.horarioFin}</p>
                <p>📅 {p.dias.join(", ")}</p>
              </div>
            </div>
          ))}
          {programs.length === 0 && (
            <p className="col-span-3 text-[#7B6FA0] text-center py-10">Sin programas activos por ahora.</p>
          )}
        </div>
      </div>

      {/* Modal: Idea de programa */}
      <Modal open={openModal === "idea"} onClose={() => setOpenModal(null)} title="🎙️ Proponer idea de programa" size="lg">
        <form onSubmit={submitIdea} className="space-y-4">
          <Input label="Título del programa *" value={ideaForm.progTitulo} onChange={e => setIdeaForm(f => ({ ...f, progTitulo: e.target.value }))} required placeholder="Ej: Tarde Musical" />
          <Input label="Conductor propuesto" value={ideaForm.progConductor} onChange={e => setIdeaForm(f => ({ ...f, progConductor: e.target.value }))} placeholder="Nombre del conductor" />
          <Textarea label="Descripción" value={ideaForm.progDescripcion} onChange={e => setIdeaForm(f => ({ ...f, progDescripcion: e.target.value }))} placeholder="Describe la idea del programa..." />
          <Input label="Horario sugerido" value={ideaForm.progHorario} onChange={e => setIdeaForm(f => ({ ...f, progHorario: e.target.value }))} placeholder="Ej: 14:00 - 16:00" />
          <div>
            <p className="text-xs font-medium text-[#A89EC0] uppercase tracking-wide mb-2">Días sugeridos</p>
            <div className="flex flex-wrap gap-2">
              {DIAS.map(dia => (
                <button key={dia} type="button" onClick={() => toggleDia(dia)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${ideaForm.progDias.includes(dia) ? "bg-[#E8D44D] text-[#0D0825]" : "bg-[rgba(124,58,237,0.1)] text-[#A89EC0] border border-[rgba(124,58,237,0.3)]"}`}>
                  {dia}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setOpenModal(null)}>Cancelar</Button>
            <Button type="submit" loading={isPending}>Enviar propuesta</Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Referido */}
      <Modal open={openModal === "referral"} onClose={() => setOpenModal(null)} title="👤 Indicar un referido">
        <form onSubmit={submitReferral} className="space-y-4">
          <Input label="Nombre completo *" value={refForm.refNombre} onChange={e => setRefForm(f => ({ ...f, refNombre: e.target.value }))} required />
          <Input label="Email" type="email" value={refForm.refEmail} onChange={e => setRefForm(f => ({ ...f, refEmail: e.target.value }))} />
          <Input label="Teléfono" value={refForm.refTelefono} onChange={e => setRefForm(f => ({ ...f, refTelefono: e.target.value }))} />
          <Textarea label="Nota adicional" value={refForm.refNota} onChange={e => setRefForm(f => ({ ...f, refNota: e.target.value }))} placeholder="¿Por qué recomendas a esta persona?" />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setOpenModal(null)}>Cancelar</Button>
            <Button type="submit" loading={isPending}>Enviar referido</Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Sponsor */}
      <Modal open={openModal === "sponsor"} onClose={() => setOpenModal(null)} title="🤝 Proponer auspiciador">
        <form onSubmit={submitSponsor} className="space-y-4">
          <Input label="Empresa *" value={sponForm.sponEmpresa} onChange={e => setSponForm(f => ({ ...f, sponEmpresa: e.target.value }))} required />
          <Input label="Nombre de contacto" value={sponForm.sponContacto} onChange={e => setSponForm(f => ({ ...f, sponContacto: e.target.value }))} />
          <Input label="Email" type="email" value={sponForm.sponEmail} onChange={e => setSponForm(f => ({ ...f, sponEmail: e.target.value }))} />
          <Textarea label="Nota / contexto" value={sponForm.sponNota} onChange={e => setSponForm(f => ({ ...f, sponNota: e.target.value }))} placeholder="¿Cómo los conoces? ¿Cuál sería su aporte?" />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setOpenModal(null)}>Cancelar</Button>
            <Button type="submit" loading={isPending}>Enviar sugerencia</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
