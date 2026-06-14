"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Switch } from "@/components/ui/Switch";
import { useToast } from "@/components/ui/Toast";
import { createUser, toggleUserStatus, deleteUser } from "@/lib/actions/users.actions";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  telefono: string | null;
  role: "ADMIN" | "SUBADMIN" | "TEAM";
  status: "ACTIVE" | "INACTIVE";
  createdAt: Date;
};

const ITEMS_PER_PAGE = 10;

export function UsuariosClient({ initialUsers }: { initialUsers: User[] }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [users, setUsers] = useState(initialUsers);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [form, setForm] = useState({
    nombre: "", apellido: "", username: "", email: "",
    password: "", telefono: "", direccion: "", role: "TEAM",
  });
  const [formError, setFormError] = useState("");

  const filtered = users.filter((u) => {
    if (filterRole && u.role !== filterRole) return false;
    if (filterStatus && u.status !== filterStatus) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");
    startTransition(async () => {
      const res = await createUser({ ...form, role: form.role as "ADMIN" | "TEAM" });
      if (res.success) {
        toast("Usuario creado exitosamente");
        setModalOpen(false);
        setForm({ nombre: "", apellido: "", username: "", email: "", password: "", telefono: "", direccion: "", role: "TEAM" });
        router.refresh();
      } else {
        setFormError(res.error || "Error al crear");
      }
    });
  }

  async function handleToggle(userId: string) {
    startTransition(async () => {
      const res = await toggleUserStatus(userId);
      if (res.success) {
        setUsers((prev) => prev.map((u) => u.id === userId ? { ...u, status: res.data!.status as "ACTIVE" | "INACTIVE" } : u));
        toast("Estado actualizado");
      } else {
        toast(res.error || "Error", "error");
      }
    });
  }

  async function handleDelete(userId: string, name: string) {
    if (!confirm(`¿Eliminar a ${name}? Esta acción no se puede deshacer.`)) return;
    startTransition(async () => {
      const res = await deleteUser(userId);
      if (res.success) {
        setUsers((prev) => prev.filter((u) => u.id !== userId));
        toast("Usuario eliminado");
      } else {
        toast(res.error || "Error", "error");
      }
    });
  }

  return (
    <>
      {/* Filters + New user button */}
      <div className="flex flex-wrap gap-3 mb-4 items-center justify-between">
        <div className="flex gap-3">
          <Select
            options={[{ value: "", label: "Todos los roles" }, { value: "ADMIN", label: "Admin" }, { value: "SUBADMIN", label: "Sub-Admin" }, { value: "TEAM", label: "Equipo" }]}
            value={filterRole}
            onChange={(e) => { setFilterRole(e.target.value); setPage(1); }}
            className="w-44"
          />
          <Select
            options={[{ value: "", label: "Todos los estados" }, { value: "ACTIVE", label: "Activo" }, { value: "INACTIVE", label: "Inactivo" }]}
            value={filterStatus}
            onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
            className="w-44"
          />
        </div>
        <Button onClick={() => setModalOpen(true)}>+ Nuevo Usuario</Button>
      </div>

      {/* Table */}
      <div className="bg-[#1C1040] border border-[rgba(168,85,247,0.1)] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[rgba(124,58,237,0.15)]">
                {["Nombre", "Username", "Email", "Teléfono", "Rol", "Estado", "Registro", "Acciones"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[#7B6FA0] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.map((u) => (
                <tr key={u.id} className="border-b border-[rgba(124,58,237,0.08)] hover:bg-[rgba(124,58,237,0.05)] transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{u.nombre} {u.apellido}</td>
                  <td className="px-4 py-3 text-[#A89EC0]">@{u.username}</td>
                  <td className="px-4 py-3 text-[#A89EC0]">{u.email}</td>
                  <td className="px-4 py-3 text-[#A89EC0]">{u.telefono || "—"}</td>
                  <td className="px-4 py-3"><Badge value={u.role} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={u.status === "ACTIVE"}
                        onChange={() => handleToggle(u.id)}
                        disabled={isPending}
                      />
                      <Badge value={u.status} />
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#7B6FA0] text-xs">
                    {new Date(u.createdAt).toLocaleDateString("es-CL")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://webmail.radioeclipsefm.cl?user=${encodeURIComponent(u.email)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs px-2 py-1 rounded-md font-medium transition-colors"
                        style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#A89EC0" }}
                        title="Abrir webmail"
                      >
                        ✉️ Mail
                      </a>
                      <Button
                        variant="danger"
                        className="text-xs px-2 py-1"
                        onClick={() => handleDelete(u.id, `${u.nombre} ${u.apellido}`)}
                      >
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-[#7B6FA0]">
                    No hay usuarios que mostrar.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[rgba(124,58,237,0.1)]">
            <p className="text-xs text-[#7B6FA0]">
              Página {page} de {totalPages} — {filtered.length} usuarios
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" className="text-xs px-3 py-1" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                ← Anterior
              </Button>
              <Button variant="ghost" className="text-xs px-3 py-1" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                Siguiente →
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Create modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Nuevo Usuario" size="lg">
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nombre" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} required />
            <Input label="Apellido" value={form.apellido} onChange={e => setForm(f => ({ ...f, apellido: e.target.value }))} required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Username" value={form.username} onChange={e => setForm(f => ({ ...f, username: e.target.value }))} required />
            <Input label="Email" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
          </div>
          <Input label="Contraseña" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Teléfono" value={form.telefono} onChange={e => setForm(f => ({ ...f, telefono: e.target.value }))} />
            <Select
              label="Rol"
              value={form.role}
              onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
              options={[{ value: "TEAM", label: "Equipo" }, { value: "SUBADMIN", label: "Sub-Admin" }, { value: "ADMIN", label: "Admin" }]}
            />
          </div>
          <Input label="Dirección" value={form.direccion} onChange={e => setForm(f => ({ ...f, direccion: e.target.value }))} />
          {formError && <p className="text-red-400 text-sm">{formError}</p>}
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancelar</Button>
            <Button type="submit" loading={isPending}>Crear Usuario</Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
