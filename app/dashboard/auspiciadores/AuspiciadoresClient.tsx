"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Switch } from "@/components/ui/Switch";
import { useToast } from "@/components/ui/Toast";
import { createSponsor, updateSponsor, deleteSponsor, toggleSponsorStatus } from "@/lib/actions/sponsors.actions";

type Sponsor = {
  id: string;
  empresa: string;
  contacto: string;
  email: string | null;
  telefono: string | null;
  descripcion: string | null;
  activo: boolean;
  createdAt: Date;
};

const emptyForm = { empresa: "", contacto: "", email: "", telefono: "", descripcion: "" };

export function AuspiciadoresClient({ initialSponsors }: { initialSponsors: Sponsor[] }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [sponsors, setSponsors] = useState(initialSponsors);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  function openCreate() { setEditingId(null); setForm(emptyForm); setModalOpen(true); }
  function openEdit(s: Sponsor) {
    setEditingId(s.id);
    setForm({ empresa: s.empresa, contacto: s.contacto, email: s.email || "", telefono: s.telefono || "", descripcion: s.descripcion || "" });
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      if (editingId) {
        const res = await updateSponsor(editingId, form);
        if (res.success) { setSponsors(prev => prev.map(s => s.id === editingId ? { ...s, ...form } : s)); toast("Actualizado"); setModalOpen(false); }
      } else {
        const res = await createSponsor(form);
        if (res.success && res.data) { setSponsors(prev => [res.data as Sponsor, ...prev]); toast("Creado"); setModalOpen(false); }
        else toast(res.error || "Error", "error");
      }
    });
  }

  async function handleToggle(id: string) {
    startTransition(async () => {
      const res = await toggleSponsorStatus(id);
      if (res.success) { setSponsors(prev => prev.map(s => s.id === id ? { ...s, activo: res.data!.activo } : s)); toast("Estado actualizado"); }
    });
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`¿Eliminar "${name}"?`)) return;
    startTransition(async () => {
      const res = await deleteSponsor(id);
      if (res.success) { setSponsors(prev => prev.filter(s => s.id !== id)); toast("Eliminado"); }
    });
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={openCreate}>+ Nuevo Auspiciador</Button>
      </div>

      <div className="bg-[#1C1040] border border-[rgba(168,85,247,0.1)] rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[rgba(124,58,237,0.15)]">
              {["Empresa", "Contacto", "Email", "Teléfono", "Estado", "Acciones"].map(h => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7B6FA0] uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sponsors.map(s => (
              <tr key={s.id} className="border-b border-[rgba(124,58,237,0.08)] hover:bg-[rgba(124,58,237,0.05)] transition-colors">
                <td className="px-4 py-3 text-white font-medium">{s.empresa}</td>
                <td className="px-4 py-3 text-[#A89EC0]">{s.contacto}</td>
                <td className="px-4 py-3 text-[#A89EC0]">{s.email || "—"}</td>
                <td className="px-4 py-3 text-[#A89EC0]">{s.telefono || "—"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Switch checked={s.activo} onChange={() => handleToggle(s.id)} disabled={isPending} />
                    <Badge value={s.activo ? "ACTIVE" : "INACTIVE"} />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <Button variant="secondary" className="text-xs px-2 py-1" onClick={() => openEdit(s)}>Editar</Button>
                    <Button variant="danger" className="text-xs px-2 py-1" onClick={() => handleDelete(s.id, s.empresa)}>✕</Button>
                  </div>
                </td>
              </tr>
            ))}
            {sponsors.length === 0 && (
              <tr><td colSpan={6} className="text-center py-10 text-[#7B6FA0]">No hay auspiciadores registrados.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingId ? "Editar Auspiciador" : "Nuevo Auspiciador"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Empresa" value={form.empresa} onChange={e => setForm(f => ({ ...f, empresa: e.target.value }))} required />
          <Input label="Contacto" value={form.contacto} onChange={e => setForm(f => ({ ...f, contacto: e.target.value }))} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            <Input label="Teléfono" value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} />
          </div>
          <Textarea label="Descripción / Notas" value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} />
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button type="submit" loading={isPending}>{editingId ? "Actualizar" : "Crear"}</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
