import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function SubadminPage() {
  const session = await auth();

  const [posts, noticias, programas] = await Promise.all([
    prisma.post.count(),
    prisma.noticia.count(),
    prisma.program.count({ where: { activo: true } }),
  ]);

  const cards = [
    { title: "Posts publicados", value: await prisma.post.count({ where: { publicado: true } }), total: posts, icon: "✍️", color: "border-purple-500/20" },
    { title: "Noticias publicadas", value: await prisma.noticia.count({ where: { publicado: true } }), total: noticias, icon: "📰", color: "border-blue-500/20" },
    { title: "Programas activos", value: programas, icon: "📻", color: "border-emerald-500/20" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          Bienvenido, <span className="text-[#A855F7]">{session?.user.nombre}</span> 👋
        </h1>
        <p className="text-[#7B6FA0] mt-1 text-sm">Panel de gestión web — Eclipse FM 107.7</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.title} className={`bg-[#1C1040] border ${c.color} rounded-2xl p-6`}>
            <div className="text-3xl mb-3">{c.icon}</div>
            <p className="text-3xl font-bold text-white">{c.value}</p>
            {c.total !== undefined && c.total !== c.value && (
              <p className="text-xs text-[#7B6FA0] mt-0.5">{c.total} en total</p>
            )}
            <p className="text-[#A89EC0] text-sm mt-1">{c.title}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-[#1C1040] border border-[rgba(168,85,247,0.1)] rounded-2xl p-6">
        <h2 className="font-semibold text-white mb-4">Accesos rápidos</h2>
        <div className="space-y-2">
          {[
            { href: "/subadmin/blog", label: "Gestionar blog", icon: "✍️" },
            { href: "/subadmin/noticias", label: "Gestionar noticias", icon: "📰" },
            { href: "/subadmin/programas", label: "Ver programación", icon: "📻" },
          ].map(link => (
            <a key={link.href} href={link.href}
              className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-[#A89EC0] hover:text-white hover:bg-[rgba(124,58,237,0.1)] transition-all text-sm">
              <span>{link.icon}</span>
              {link.label}
              <span className="ml-auto text-[#7B6FA0]">→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
