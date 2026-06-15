"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Switch } from "@/components/ui/Switch";
import { useToast } from "@/components/ui/Toast";
import { createProgram, updateProgram, deleteProgram, toggleProgramStatus } from "@/lib/actions/programs.actions";
import { createProposal } from "@/lib/actions/proposals.actions";

type Program = {
  id: string;
  titulo: string;
  descripcion: string;
  conductor: string;
  horarioInicio: string;
  horarioFin: string;
  dias: string[];
  categoria: string;
  activo: boolean;
  createdAt: Date;
};

const DIAS_SEMANA = [
  { label: "Lunes", value: "LUNES" },
  { label: "Martes", value: "MARTES" },
  { label: "Miércoles", value: "MIERCOLES" },
  { label: "Jueves", value: "JUEVES" },
  { label: "Viernes", value: "VIERNES" },
  { label: "Sábado", value: "SABADO" },
  { label: "Domingo", value: "DOMINGO" },
];
const CATEGORIAS = [
  { value: "MUSICA", label: "Música" },
  { value: "ENTRETENIMIENTO", label: "Entretenimiento" },
  { value: "CIUDADANO", label: "Ciudadano" },
  { value: "BIENESTAR", label: "Bienestar" },
  { value: "RETRO", label: "Retro" },
  { value: "CULTURAL", label: "Cultural" },
];

const emptyForm = {
  titulo: "", descripcion: "", conductor: "",
  horarioInicio: "", horarioFin: "", dias: [] as string[], categoria: "MUSICA",
};

export function ProgramasClient({ initialPrograms, canCreate = true }: { initialPrograms: Program[]; canCreate?: boolean }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [programs, setPrograms] = useState(initialPrograms);
  const [modalOpen, setModalOpen] = useState(false);
  const [proposeOpen, setProposeOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [proposeForm, setProposeForm] = useState({ progTitulo: "", progConductor: "", progDescripcion: "", progHorario: "" });

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  }

  function openEdit(p: Program) {
    setEditingId(p.id);
    setForm({
      titulo: p.titulo, descripcion: p.descripcion, conductor: p.conductor,
      horarioInicio: p.horarioInicio, horarioFin: p.horarioFin,
      dias: p.dias, categoria: p.categoria,
    });
    setModalOpen(true);
  }

  function toggleDia(dia: string) {
    setForm(f => ({
      ...f,
      dias: f.dias.includes(dia) ? f.dias.filter(d => d !== dia) : [...f.dias, dia],
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    startTransition(async () => {
      if (editingId) {
        const res = await updateProgram(editingId, form as Parameters<typeof updateProgram>[1]);
        if (res.success) {
          setPrograms(prev => prev.map(p => p.id === editingId ? { ...p, ...form } : p));
          toast("Programa actualizado");
          setModalOpen(false);
        } else {
          setFormError("Error al actualizar");
        }
      } else {
        const res = await createProgram(form as Parameters<typeof createProgram>[0]);
        if (res.success && res.data) {
          setPrograms(prev => [res.data as Program, ...prev]);
          toast("Programa creado");
          setModalOpen(false);
        } else {
          setFormError(res.error || "Error");
        }
      }
    });
  }

  async function handleToggle(id: string) {
    startTransition(async () => {
      const res = await toggleProgramStatus(id);
      if (res.success) {
        setPrograms(prev => prev.map(p => p.id === id ? { ...p, activo: res.data!.activo } : p));
        toast("Estado actualizado");
      }
    });
  }

  async function handleDelete(id: string, titulo: string) {
    if (!confirm(`¿Eliminar "${titulo}"?`)) return;
    startTransition(async () => {
      const res = await deleteProgram(id);
      if (res.success) {
        setPrograms(prev => prev.filter(p => p.id !== id));
        toast("Programa eliminado");
      }
    });
  }

  async function handlePropose(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await createProposal({ tipo: "PROGRAM_IDEA", ...proposeForm });
      if (res.success) {
        toast("Propuesta enviada al administrador");
        setProposeOpen(false);
        setProposeForm({ progTitulo: "", progConductor: "", progDescripcion: "", progHorario: "" });
      } else {
        toast(res.error || "Error", "error");
      }
    });
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        {canCreate ? (
          <Button onClick={openCreate}>+ Nuevo Programa</Button>
        ) : (
          <Button onClick={() => setProposeOpen(true)}>+ Proponer Programa</Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {programs.map((p) => (
          <div
            key={p.id}
            className="bg-[#1C1040] border border-[rgba(168,85,247,0.1)] rounded-2xl p-5 flex flex-col gap-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-white text-base">{p.titulo}</h3>
                <p className="text-[#A89EC0] text-xs mt-0.5">🎙 {p.conductor}</p>
              </div>
              <Switch checked={p.activo} onChange={() => handleToggle(p.id)} disabled={isPending} />
            </div>

            <p className="text-[#7B6FA0] text-xs line-clamp-2">{p.descripcion}</p>

            <div className="flex flex-wrap gap-1.5">
              <Badge value={p.categoria} />
              {!p.activo && <Badge value="INACTIVE" />}
            </div>

            <div className="text-xs text-[#A89EC0] space-y-1">
              <p>⏰ {p.horarioInicio} – {p.horarioFin}</p>
              <p>📅 {p.dias.map(d => DIAS_SEMANA.find(x => x.value === d)?.label ?? d).join(", ")}</p>
            </div>

            <div className="flex gap-2 mt-auto pt-2 border-t border-[rgba(124,58,237,0.1)]">
              <Button variant="secondary" className="flex-1 text-xs" onClick={() => openEdit(p)}>
                Editar
              </Button>
              <Button variant="danger" className="text-xs px-3" onClick={() => handleDelete(p.id, p.titulo)}>
                ✕
              </Button>
            </div>
          </div>
        ))}
        {programs.length === 0 && (
          <p className="col-span-3 text-center text-[#7B6FA0] py-16">No hay programas registrados.</p>
        )}
      </div>

      <Modal open={proposeOpen} onClose={() => setProposeOpen(false)} title="Proponer nuevo programa" size="lg">
        <form onSubmit={handlePropose} className="space-y-4">
          <Input label="Titulo del programa *" value={proposeForm.progTitulo} onChange={e => setProposeForm(f => ({ ...f, progTitulo: e.target.value }))} required />
          <Input label="Conductor propuesto" value={proposeForm.progConductor} onChange={e => setProposeForm(f => ({ ...f, progConductor: e.target.value }))} />
          <Textarea label="Descripcion" value={proposeForm.progDescripcion} onChange={e => setProposeForm(f => ({ ...f, progDescripcion: e.target.value }))} />
          <Input label="Horario sugerido" value={proposeForm.progHorario} onChange={e => setProposeForm(f => ({ ...f, progHorario: e.target.value }))} placeholder="Ej: 14:00 - 16:00" />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setProposeOpen(false)}>Cancelar</Button>
            <Button type="submit" loading={isPending}>Enviar propuesta</Button>
          </div>
        </form>
      </Modal>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Editar Programa" : "Nuevo Programa"} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Título" value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))} required />
          <Input label="Conductor" value={form.conductor} onChange={e => setForm(f => ({ ...f, conductor: e.target.value }))} required />
          <Textarea label="Descripción" value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} required />
          <Select label="Categoría" value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value }))} options={CATEGORIAS} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Horario inicio" type="time" value={form.horarioInicio} onChange={e => setForm(f => ({ ...f, horarioInicio: e.target.value }))} required />
            <Input label="Horario fin" type="time" value={form.horarioFin} onChange={e => setForm(f => ({ ...f, horarioFin: e.target.value }))} required />
          </div>
          <div>
            <p className="text-xs font-medium text-[#A89EC0] uppercase tracking-wide mb-2">Días</p>
            <div className="flex flex-wrap gap-2">
              {DIAS_SEMANA.map((dia) => (
                <button
                  key={dia.value}
                  type="button"
                  onClick={() => toggleDia(dia.value)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    form.dias.includes(dia.value)
                      ? "bg-[#E8D44D] text-[#0D0825]"
                      : "bg-[rgba(124,58,237,0.1)] text-[#A89EC0] border border-[rgba(124,58,237,0.3)]"
                  }`}
                >
                  {dia.label}
                </button>
              ))}
            </div>
          </div>
          {formError && <p className="text-red-400 text-sm">{formError}</p>}
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button type="submit" loading={isPending}>{editingId ? "Actualizar" : "Crear"}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
