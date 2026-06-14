"use client";

import { useState, useTransition } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/ui/Toast";
import { createProposal } from "@/lib/actions/proposals.actions";

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export function ProposalCards() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [openModal, setOpenModal] = useState<"idea" | "sponsor" | null>(null);
  const [ideaForm, setIdeaForm] = useState({ progTitulo: "", progConductor: "", progDescripcion: "", progHorario: "", progDias: [] as string[] });
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
      if (res.success) { toast("Propuesta enviada"); setOpenModal(null); setIdeaForm({ progTitulo: "", progConductor: "", progDescripcion: "", progHorario: "", progDias: [] }); }
      else toast(res.error || "Error", "error");
    });
  }

  async function submitSponsor(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await createProposal({ tipo: "SPONSOR_SUGGESTION", ...sponForm });
      if (res.success) { toast("Sugerencia enviada"); setOpenModal(null); setSponForm({ sponEmpresa: "", sponContacto: "", sponEmail: "", sponNota: "" }); }
      else toast(res.error || "Error", "error");
    });
  }

  return (
    <>
      <div className="mt-8">
        <p className="text-[#7B6FA0] text-xs uppercase tracking-widest mb-3">Proponer</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => setOpenModal("idea")}
            className="text-left p-5 bg-[#1C1040] border border-[rgba(168,85,247,0.2)] hover:border-[rgba(168,85,247,0.5)] rounded-2xl transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">🎙️</div>
            <h3 className="font-semibold text-white text-sm mb-1">Idea de programa</h3>
            <p className="text-[#7B6FA0] text-xs">Proponer un nuevo programa a la direccion</p>
          </button>
          <button
            onClick={() => setOpenModal("sponsor")}
            className="text-left p-5 bg-[#1C1040] border border-[rgba(52,211,153,0.2)] hover:border-[rgba(52,211,153,0.5)] rounded-2xl transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-xl mb-3 group-hover:scale-110 transition-transform">🤝</div>
            <h3 className="font-semibold text-white text-sm mb-1">Proponer auspiciador</h3>
            <p className="text-[#7B6FA0] text-xs">Sugerir una empresa o contacto comercial</p>
          </button>
        </div>
      </div>

      <Modal open={openModal === "idea"} onClose={() => setOpenModal(null)} title="Proponer idea de programa" size="lg">
        <form onSubmit={submitIdea} className="space-y-4">
          <Input label="Título del programa *" value={ideaForm.progTitulo} onChange={e => setIdeaForm(f => ({ ...f, progTitulo: e.target.value }))} required />
          <Input label="Conductor propuesto" value={ideaForm.progConductor} onChange={e => setIdeaForm(f => ({ ...f, progConductor: e.target.value }))} />
          <Textarea label="Descripción" value={ideaForm.progDescripcion} onChange={e => setIdeaForm(f => ({ ...f, progDescripcion: e.target.value }))} />
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

      <Modal open={openModal === "sponsor"} onClose={() => setOpenModal(null)} title="Proponer auspiciador">
        <form onSubmit={submitSponsor} className="space-y-4">
          <Input label="Empresa *" value={sponForm.sponEmpresa} onChange={e => setSponForm(f => ({ ...f, sponEmpresa: e.target.value }))} required />
          <Input label="Nombre de contacto" value={sponForm.sponContacto} onChange={e => setSponForm(f => ({ ...f, sponContacto: e.target.value }))} />
          <Input label="Email" type="email" value={sponForm.sponEmail} onChange={e => setSponForm(f => ({ ...f, sponEmail: e.target.value }))} />
          <Textarea label="Nota / contexto" value={sponForm.sponNota} onChange={e => setSponForm(f => ({ ...f, sponNota: e.target.value }))} />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setOpenModal(null)}>Cancelar</Button>
            <Button type="submit" loading={isPending}>Enviar sugerencia</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
