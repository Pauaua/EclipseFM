"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Modal } from "@/components/ui/Modal";
import { Switch } from "@/components/ui/Switch";
import { useToast } from "@/components/ui/Toast";

type ContentItem = {
  id: string;
  titulo: string;
  slug: string;
  resumen: string | null;
  contenido: string;
  imagen: string | null;
  publicado: boolean;
  autor: string;
  createdAt: Date;
};

interface ContentManagerProps {
  items: ContentItem[];
  tipo: "blog" | "noticias";
  onCreate: (data: Partial<ContentItem>) => Promise<{ success: boolean; data?: ContentItem; error?: string }>;
  onUpdate: (id: string, data: Partial<ContentItem>) => Promise<{ success: boolean; error?: string }>;
  onDelete: (id: string) => Promise<{ success: boolean }>;
  onToggle: (id: string) => Promise<{ success: boolean; data?: { publicado: boolean } }>;
  autorDefault: string;
}

const emptyForm = { titulo: "", slug: "", resumen: "", contenido: "", imagen: "", autor: "", publicado: false };

function toSlug(str: string) {
  return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
}

export function ContentManager({ items: initialItems, tipo, onCreate, onUpdate, onDelete, onToggle, autorDefault }: ContentManagerProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [items, setItems] = useState(initialItems);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ ...emptyForm, autor: autorDefault });
  const [formError, setFormError] = useState("");

  const label = tipo === "blog" ? "Post" : "Noticia";

  function openCreate() {
    setEditingId(null);
    setForm({ ...emptyForm, autor: autorDefault });
    setFormError("");
    setModalOpen(true);
  }

  function openEdit(item: ContentItem) {
    setEditingId(item.id);
    setForm({
      titulo: item.titulo,
      slug: item.slug,
      resumen: item.resumen || "",
      contenido: item.contenido,
      imagen: item.imagen || "",
      autor: item.autor,
      publicado: item.publicado,
    });
    setFormError("");
    setModalOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    startTransition(async () => {
      if (editingId) {
        const res = await onUpdate(editingId, form);
        if (res.success) {
          setItems(prev => prev.map(i => i.id === editingId ? { ...i, ...form } : i));
          toast(`${label} actualizado`);
          setModalOpen(false);
        } else {
          setFormError(res.error || "Error al actualizar");
        }
      } else {
        const res = await onCreate(form);
        if (res.success && res.data) {
          setItems(prev => [res.data as ContentItem, ...prev]);
          toast(`${label} creado`);
          setModalOpen(false);
        } else {
          setFormError(res.error || "Error al crear");
        }
      }
    });
  }

  async function handleToggle(id: string) {
    startTransition(async () => {
      const res = await onToggle(id);
      if (res.success) {
        setItems(prev => prev.map(i => i.id === id ? { ...i, publicado: res.data!.publicado } : i));
        toast("Estado actualizado");
      }
    });
  }

  async function handleDelete(id: string, titulo: string) {
    if (!confirm(`¿Eliminar "${titulo}"?`)) return;
    startTransition(async () => {
      const res = await onDelete(id);
      if (res.success) {
        setItems(prev => prev.filter(i => i.id !== id));
        toast(`${label} eliminado`);
      }
    });
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button onClick={openCreate}>+ Nuevo {label}</Button>
      </div>

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="bg-[#1C1040] border border-[rgba(168,85,247,0.1)] rounded-2xl p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-white truncate">{item.titulo}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${item.publicado ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30" : "bg-gray-500/15 text-gray-400 border border-gray-500/30"}`}>
                    {item.publicado ? "Publicado" : "Borrador"}
                  </span>
                </div>
                <p className="text-xs text-[#7B6FA0] mb-1">
                  <span className="text-[#A89EC0]">/{item.slug}</span> · {item.autor} · {new Date(item.createdAt).toLocaleDateString("es-CL")}
                </p>
                {item.resumen && <p className="text-sm text-[#A89EC0] line-clamp-2">{item.resumen}</p>}
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Switch checked={item.publicado} onChange={() => handleToggle(item.id)} disabled={isPending} />
                <Button variant="secondary" className="text-xs px-3 py-1.5" onClick={() => openEdit(item)}>Editar</Button>
                <Button variant="danger" className="text-xs px-2.5 py-1.5" onClick={() => handleDelete(item.id, item.titulo)}>✕</Button>
              </div>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center py-16 text-[#7B6FA0]">No hay {tipo === "blog" ? "posts" : "noticias"} aún.</div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={`${editingId ? "Editar" : "Nuevo"} ${label}`} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Título"
            value={form.titulo}
            onChange={e => {
              const titulo = e.target.value;
              setForm(f => ({ ...f, titulo, slug: editingId ? f.slug : toSlug(titulo) }));
            }}
            required
          />
          <Input
            label="Slug (URL)"
            value={form.slug}
            onChange={e => setForm(f => ({ ...f, slug: toSlug(e.target.value) }))}
            placeholder="mi-post-de-ejemplo"
            required
          />
          <Input label="Resumen (opcional)" value={form.resumen} onChange={e => setForm(f => ({ ...f, resumen: e.target.value }))} />
          <Textarea
            label="Contenido"
            value={form.contenido}
            onChange={e => setForm(f => ({ ...f, contenido: e.target.value }))}
            rows={6}
            required
          />
          <Input label="URL de imagen (opcional)" value={form.imagen} onChange={e => setForm(f => ({ ...f, imagen: e.target.value }))} placeholder="https://..." />
          <Input label="Autor" value={form.autor} onChange={e => setForm(f => ({ ...f, autor: e.target.value }))} required />
          <div className="flex items-center gap-3">
            <Switch checked={form.publicado} onChange={v => setForm(f => ({ ...f, publicado: v }))} />
            <span className="text-sm text-[#A89EC0]">Publicar inmediatamente</span>
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
