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
      {/* Thumbnail */}
      <div className={`h-40 bg-gradient-to-br ${grad} flex items-center justify-center relative`}>
        <span className="text-5xl">{emoji}</span>
        <span className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-black/40 text-white tracking-wide">
          {label}
        </span>
      </div>
      {/* Body */}
      <div className="p-5">
        <h3 className="font-display text-2xl text-white tracking-wide mb-1 leading-tight">{program.titulo}</h3>
        <p className="text-xs text-gray-mid mb-3">🎙 {program.conductor}</p>
        <p className="text-gray-soft text-sm leading-relaxed line-clamp-2 mb-4">{program.descripcion}</p>
        <div className="pt-4 border-t border-purple-border flex items-center justify-between">
          <div className="text-xs text-gray-soft space-y-0.5">
            <p>⏰ {program.horarioInicio} – {program.horarioFin}</p>
            <p>📅 {program.dias.slice(0, 3).join(", ")}{program.dias.length > 3 ? "…" : ""}</p>
          </div>
          <span className="text-xs text-yellow-DEFAULT font-semibold group-hover:translate-x-1 transition-transform">
            Escuchar →
          </span>
        </div>
      </div>
    </div>
  );
}
