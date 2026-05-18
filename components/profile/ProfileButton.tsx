"use client";

import { useState } from "react";
import { ProfileModal } from "./ProfileModal";
import { logoutAction } from "@/lib/actions/auth.actions";

interface ProfileButtonProps {
  user: {
    nombre: string;
    apellido: string;
    email: string;
    username?: string;
    telefono?: string | null;
    direccion?: string | null;
    role: string;
  };
  sublabel?: string;
}

export function ProfileButton({ user, sublabel }: ProfileButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-3 group text-right hover:opacity-80 transition-opacity"
          title="Editar perfil"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white group-hover:text-[#E8D44D] transition-colors">
              {user.nombre} {user.apellido}
            </p>
            <p className="text-xs text-[#7B6FA0]">{sublabel}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#E8D44D] flex items-center justify-center text-[#0D0825] font-bold text-sm ring-2 ring-transparent group-hover:ring-[#E8D44D] transition-all">
            {user.nombre[0]}
          </div>
        </button>

        <form action={logoutAction}>
          <button
            type="submit"
            className="text-xs text-[#7B6FA0] hover:text-red-400 transition-colors px-2 py-1"
          >
            Salir
          </button>
        </form>
      </div>

      <ProfileModal open={open} onClose={() => setOpen(false)} user={user} />
    </>
  );
}
