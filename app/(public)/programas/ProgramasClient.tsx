"use client";

import { useState } from "react";
import { ProgramCard } from "@/components/public/ui/ProgramCard";

const categoryLabel: Record<string, string> = {
  MUSICA: "Música",
  ENTRETENIMIENTO: "Entretenimiento",
  CIUDADANO: "Ciudadano",
  BIENESTAR: "Bienestar",
  RETRO: "Retro",
  CULTURAL: "Cultural",
};

type Program = {
  id: string; titulo: string; descripcion: string; conductor: string;
  horarioInicio: string; horarioFin: string; dias: string[]; categoria: string;
};

export function ProgramasClient({ programas }: { programas: Program[] }) {
  const categorias = Array.from(new Set(programas.map((p) => p.categoria)));
  const [active, setActive] = useState("TODOS");

  const filtered = active === "TODOS" ? programas : programas.filter((p) => p.categoria === active);

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-10">
        {["TODOS", ...categorias].map((cat) => {
          const isActive = active === cat;
          return (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className="px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wide uppercase transition-all"
              style={
                isActive
                  ? { background: "rgba(232,212,77,0.15)", border: "1px solid rgba(232,212,77,0.5)", color: "#E8D44D" }
                  : { background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)", color: "#7B6FA0" }
              }
            >
              {cat === "TODOS" ? "Todos" : (categoryLabel[cat] ?? cat.replace(/_/g, " "))}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filtered.map((p) => (
          <ProgramCard key={p.id} program={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-gray-mid text-sm">No hay programas en esta categoría.</p>
        </div>
      )}
    </>
  );
}
