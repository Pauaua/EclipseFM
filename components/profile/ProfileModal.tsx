"use client";

import { useState, useTransition } from "react";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { InputPassword } from "@/components/ui/InputPassword";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { updateProfile, changePassword } from "@/lib/actions/profile.actions";

interface ProfileModalProps {
  open: boolean;
  onClose: () => void;
  user: {
    nombre: string;
    apellido: string;
    email: string;
    username?: string;
    telefono?: string | null;
    direccion?: string | null;
    role: string;
  };
}

const roleLabel: Record<string, string> = {
  ADMIN: "Administrador",
  SUBADMIN: "Sub-Administrador",
  TEAM: "Equipo",
};

export function ProfileModal({ open, onClose, user }: ProfileModalProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState<"datos" | "password">("datos");

  const [datos, setDatos] = useState({
    nombre: user.nombre,
    apellido: user.apellido,
    telefono: user.telefono || "",
    direccion: user.direccion || "",
  });

  const [pass, setPass] = useState({
    passwordActual: "",
    passwordNueva: "",
    passwordConfirm: "",
  });

  const [errorDatos, setErrorDatos] = useState("");
  const [errorPass, setErrorPass] = useState("");

  async function handleSaveDatos(e: React.FormEvent) {
    e.preventDefault();
    setErrorDatos("");
    startTransition(async () => {
      const res = await updateProfile(datos);
      if (res.success) {
        toast("Datos actualizados correctamente");
        onClose();
      } else {
        setErrorDatos(res.error || "Error al actualizar");
      }
    });
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    setErrorPass("");
    if (pass.passwordNueva !== pass.passwordConfirm) {
      setErrorPass("Las contraseñas nuevas no coinciden");
      return;
    }
    startTransition(async () => {
      const res = await changePassword({
        passwordActual: pass.passwordActual,
        passwordNueva: pass.passwordNueva,
      });
      if (res.success) {
        toast("Contraseña cambiada correctamente");
        setPass({ passwordActual: "", passwordNueva: "", passwordConfirm: "" });
        onClose();
      } else {
        setErrorPass(res.error || "Error al cambiar contraseña");
      }
    });
  }

  return (
    <Modal open={open} onClose={onClose} title="Mi Perfil" size="md">
      {/* Info no editable */}
      <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.2)]">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#E8D44D] flex items-center justify-center text-[#0D0825] font-bold text-lg flex-shrink-0">
          {user.nombre[0]}
        </div>
        <div>
          <p className="text-white font-semibold">{user.nombre} {user.apellido}</p>
          <p className="text-[#A89EC0] text-xs">{user.email}</p>
          {user.username && <p className="text-[#7B6FA0] text-xs">@{user.username}</p>}
          <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
            {roleLabel[user.role] || user.role}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-5 bg-[#08041A] p-1 rounded-lg">
        <button
          onClick={() => setTab("datos")}
          className={`flex-1 py-1.5 text-sm rounded-md transition-all ${tab === "datos" ? "bg-[#1C1040] text-white border border-[rgba(124,58,237,0.3)]" : "text-[#7B6FA0] hover:text-white"}`}
        >
          Mis datos
        </button>
        <button
          onClick={() => setTab("password")}
          className={`flex-1 py-1.5 text-sm rounded-md transition-all ${tab === "password" ? "bg-[#1C1040] text-white border border-[rgba(124,58,237,0.3)]" : "text-[#7B6FA0] hover:text-white"}`}
        >
          Cambiar contraseña
        </button>
      </div>

      {/* Tab: datos */}
      {tab === "datos" && (
        <form onSubmit={handleSaveDatos} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Nombre"
              value={datos.nombre}
              onChange={e => setDatos(d => ({ ...d, nombre: e.target.value }))}
              required
            />
            <Input
              label="Apellido"
              value={datos.apellido}
              onChange={e => setDatos(d => ({ ...d, apellido: e.target.value }))}
              required
            />
          </div>
          <Input
            label="Teléfono"
            value={datos.telefono}
            onChange={e => setDatos(d => ({ ...d, telefono: e.target.value }))}
            placeholder="+56912345678"
          />
          <Input
            label="Dirección"
            value={datos.direccion}
            onChange={e => setDatos(d => ({ ...d, direccion: e.target.value }))}
            placeholder="Tu dirección"
          />
          <div className="p-3 rounded-lg bg-[rgba(124,58,237,0.05)] border border-[rgba(124,58,237,0.15)]">
            <p className="text-xs text-[#7B6FA0]">
              El email y username no pueden modificarse. Contacta al administrador si necesitas cambiarlos.
            </p>
          </div>
          {errorDatos && <p className="text-red-400 text-sm">{errorDatos}</p>}
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit" loading={isPending}>Guardar cambios</Button>
          </div>
        </form>
      )}

      {/* Tab: contraseña */}
      {tab === "password" && (
        <form onSubmit={handleChangePassword} className="space-y-4">
          <InputPassword
            label="Contraseña actual"
            value={pass.passwordActual}
            onChange={e => setPass(p => ({ ...p, passwordActual: e.target.value }))}
            required
            placeholder="••••••••"
          />
          <InputPassword
            label="Nueva contraseña"
            value={pass.passwordNueva}
            onChange={e => setPass(p => ({ ...p, passwordNueva: e.target.value }))}
            required
            placeholder="Mínimo 6 caracteres"
          />
          <InputPassword
            label="Confirmar nueva contraseña"
            value={pass.passwordConfirm}
            onChange={e => setPass(p => ({ ...p, passwordConfirm: e.target.value }))}
            required
            placeholder="Repite la nueva contraseña"
          />
          {errorPass && <p className="text-red-400 text-sm">{errorPass}</p>}
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="ghost" type="button" onClick={onClose}>Cancelar</Button>
            <Button type="submit" loading={isPending}>Cambiar contraseña</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
