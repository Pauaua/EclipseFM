import { getDashboardStats } from "@/lib/actions/proposals.actions";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();
  const stats = await getDashboardStats();

  const cards = [
    {
      title: "Usuarios Activos",
      value: stats.usuarios,
      icon: "👥",
      color: "from-purple-600 to-purple-800",
      border: "border-purple-500/20",
    },
    {
      title: "Programas Activos",
      value: stats.programas,
      icon: "📻",
      color: "from-blue-600 to-blue-800",
      border: "border-blue-500/20",
    },
    {
      title: "Auspiciadores",
      value: stats.auspiciadores,
      icon: "🤝",
      color: "from-emerald-600 to-emerald-800",
      border: "border-emerald-500/20",
    },
    {
      title: "Propuestas Pendientes",
      value: stats.propuestas,
      icon: "📬",
      color: "from-yellow-600 to-yellow-800",
      border: "border-yellow-500/20",
      alert: stats.propuestas > 0,
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Bienvenido, {session?.user.nombre} 👋
        </h1>
        <p className="text-[#7B6FA0] mt-1 text-sm">
          Panel de gestión — Radio Eclipse FM 107.7
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div
            key={c.title}
            className={`relative rounded-2xl p-6 bg-[#1C1040] border ${c.border} overflow-hidden`}
          >
            {c.alert && (
              <div className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
            )}
            <div className="text-3xl mb-3">{c.icon}</div>
            <p className="text-3xl font-bold text-white">{c.value}</p>
            <p className="text-[#A89EC0] text-sm mt-1">{c.title}</p>
            <div
              className={`absolute bottom-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${c.color} opacity-10 translate-x-6 translate-y-6`}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-[#1C1040] border border-[rgba(168,85,247,0.1)] rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Accesos rápidos</h2>
          <div className="space-y-2">
            {[
              { href: "/dashboard/usuarios", label: "Gestionar usuarios", icon: "👥" },
              { href: "/dashboard/programas", label: "Ver programación", icon: "📻" },
              { href: "/dashboard/propuestas", label: "Revisar propuestas", icon: "📬" },
              { href: "/dashboard/auspiciadores", label: "Auspiciadores", icon: "🤝" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#A89EC0] hover:text-white hover:bg-[rgba(124,58,237,0.1)] transition-all text-sm"
              >
                <span>{link.icon}</span>
                {link.label}
                <span className="ml-auto text-[#7B6FA0]">→</span>
              </a>
            ))}
          </div>
        </div>

        <div className="bg-[#1C1040] border border-[rgba(168,85,247,0.1)] rounded-2xl p-6">
          <h2 className="font-semibold text-white mb-4">Estado del sistema</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[#A89EC0]">Base de datos</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                Conectada
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#A89EC0]">Autenticación</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                Activa
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-[#A89EC0]">Sesión</span>
              <span className="text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block" />
                {session?.user.email}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
