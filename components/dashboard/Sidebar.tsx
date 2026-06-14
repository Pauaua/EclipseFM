"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EclipseLogo } from "@/components/EclipseLogo";

interface SidebarProps {
  pendingCount?: number;
}

const navItems = [
  { href: "/dashboard", label: "Resumen", icon: "📊", exact: true },
  { href: "/dashboard/usuarios", label: "Usuarios", icon: "👥" },
  { href: "/dashboard/programas", label: "Programas", icon: "📻" },
  { href: "/dashboard/auspiciadores", label: "Auspiciadores", icon: "🤝" },
  { href: "/dashboard/propuestas", label: "Propuestas", icon: "📬", badge: true },
  { href: "/dashboard/blog", label: "Blog", icon: "✍️" },
  { href: "/dashboard/noticias", label: "Noticias", icon: "📰" },
  { href: "/dashboard/streaming", label: "Streaming", icon: "📡" },
  { href: "/dashboard/configuracion", label: "Configuración", icon: "⚙️" },
];

export function Sidebar({ pendingCount = 0 }: SidebarProps) {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside
      className="fixed left-0 top-0 h-full w-[240px] flex flex-col z-20"
      style={{ background: "#08041A", borderRight: "1px solid rgba(124,58,237,0.15)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[rgba(124,58,237,0.1)]">
        <EclipseLogo size={36} />
        <div>
          <p className="font-display text-lg tracking-wider text-[#E8D44D]">ECLIPSE FM</p>
          <p className="text-[10px] text-[#7B6FA0] tracking-widest uppercase">107.7</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 relative ${
                active
                  ? "text-[#E8D44D] bg-[rgba(232,212,77,0.08)]"
                  : "text-[#7B6FA0] hover:text-white hover:bg-[rgba(124,58,237,0.1)]"
              }`}
              style={active ? { borderLeft: "3px solid #E8D44D", paddingLeft: "calc(0.75rem - 3px)" } : {}}
            >
              <span className="text-base">{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && pendingCount > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {pendingCount > 99 ? "99+" : pendingCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-[rgba(124,58,237,0.1)]">
        <p className="text-[10px] text-[#7B6FA0] text-center">Eclipse FM © {new Date().getFullYear()}</p>
      </div>
    </aside>
  );
}
