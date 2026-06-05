const categoryEmoji: Record<string, string> = {
  MUSICA: "🎵", ENTRETENIMIENTO: "🎭", CIUDADANO: "🏛️",
  BIENESTAR: "🌿", RETRO: "📻", CULTURAL: "🎨",
};
const categoryColor: Record<string, string> = {
  MUSICA: "from-pink-900 to-pink-700",
  ENTRETENIMIENTO: "from-orange-900 to-orange-700",
  CIUDADANO: "from-cyan-900 to-cyan-700",
  BIENESTAR: "from-teal-900 to-teal-700",
  RETRO: "from-amber-900 to-amber-700",
  CULTURAL: "from-violet-900 to-violet-700",
};
const categoryLabel: Record<string, string> = {
  MUSICA: "Música", ENTRETENIMIENTO: "Entretenimiento",
  CIUDADANO: "Ciudadano", BIENESTAR: "Bienestar",
  RETRO: "Retro", CULTURAL: "Cultural",
};

type Program = {
  id: string; titulo: string; descripcion: string; conductor: string;
  horarioInicio: string; horarioFin: string; dias: string[]; categoria: string;
};

export function ProgramCard({ program }: { program: Program }) {
  const grad = categoryColor[program.categoria] || "from-purple-900 to-purple-700";
  const emoji = categoryEmoji[program.categoria] || "📻";
  const label = categoryLabel[program.categoria] || program.categoria;

  return (
    <div className="group bg-space-card border border-purple-border rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 shadow-card hover:shadow-purple">
      {/* Body */}
      <div className="p-5">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-xl leading-none">{emoji}</span>
          <h3 className="font-display text-2xl text-white tracking-wide leading-tight">{program.titulo}</h3>
        </div>
        <p className="text-xs text-gray-mid mb-3">🎙 {program.conductor}</p>
        <p className="text-gray-soft text-sm leading-relaxed line-clamp-2 mb-4">{program.descripcion}</p>
        <div className="pt-4 border-t border-purple-border flex items-center justify-between">
          <div className="text-xs text-gray-soft space-y-0.5">
            <p>⏰ {program.horarioInicio} – {program.horarioFin}</p>
            <p>📅 {program.dias.slice(0, 3).join(", ")}{program.dias.length > 3 ? "…" : ""}</p>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-wide" style={{ background: "rgba(124,58,237,0.15)", color: "rgba(168,85,247,0.9)", border: "1px solid rgba(124,58,237,0.2)" }}>
              {label}
            </span>
            <span className="text-xs text-yellow-DEFAULT font-semibold group-hover:translate-x-1 transition-transform">
              Escuchar →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
