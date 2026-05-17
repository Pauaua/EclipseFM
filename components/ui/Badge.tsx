type BadgeVariant =
  | "ACTIVE"
  | "INACTIVE"
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "ADMIN"
  | "TEAM"
  | string;

const variantClasses: Record<string, string> = {
  ACTIVE: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  INACTIVE: "bg-red-500/15 text-red-400 border border-red-500/30",
  PENDING: "bg-yellow-500/15 text-yellow-300 border border-yellow-500/30",
  APPROVED: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30",
  REJECTED: "bg-red-500/15 text-red-400 border border-red-500/30",
  ADMIN: "bg-purple-500/15 text-purple-300 border border-purple-500/30",
  TEAM: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
  MUSICA: "bg-pink-500/15 text-pink-300 border border-pink-500/30",
  ENTRETENIMIENTO: "bg-orange-500/15 text-orange-300 border border-orange-500/30",
  CIUDADANO: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/30",
  BIENESTAR: "bg-teal-500/15 text-teal-300 border border-teal-500/30",
  RETRO: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
  CULTURAL: "bg-violet-500/15 text-violet-300 border border-violet-500/30",
};

const labelMap: Record<string, string> = {
  ACTIVE: "Activo",
  INACTIVE: "Inactivo",
  PENDING: "Pendiente",
  APPROVED: "Aprobado",
  REJECTED: "Rechazado",
  ADMIN: "Admin",
  TEAM: "Equipo",
  PROGRAM_IDEA: "Idea de Programa",
  REFERRAL: "Referido",
  SPONSOR_SUGGESTION: "Auspiciador",
  MUSICA: "Música",
  ENTRETENIMIENTO: "Entretenimiento",
  CIUDADANO: "Ciudadano",
  BIENESTAR: "Bienestar",
  RETRO: "Retro",
  CULTURAL: "Cultural",
};

interface BadgeProps {
  value: BadgeVariant;
  className?: string;
}

export function Badge({ value, className = "" }: BadgeProps) {
  const cls = variantClasses[value] || "bg-gray-500/15 text-gray-300 border border-gray-500/30";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls} ${className}`}>
      {labelMap[value] || value}
    </span>
  );
}
