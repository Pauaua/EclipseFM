"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { EclipseLogo } from "@/components/EclipseLogo";

const navItems = [
  { href: "/team", label: "Inicio", icon: "🏠", exact: true },
  { href: "/team/streaming", label: "Streaming", icon: "📡" },
  { href: "/team/programas", label: "Programas", icon: "📻" },
  { href: "/team/blog", label: "Blog", icon: "✍️" },
  { href: "/team/noticias", label: "Noticias", icon: "📰" },
];

export function TeamSidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <aside
      className="fixed left-0 top-0 h-full w-[220px] flex flex-col z-20"
      style={{ background: "#08041A", borderRight: "1px solid rgba(124,58,237,0.15)" }}
    >
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[rgba(124,58,237,0.1)]">
        <EclipseLogo size={34} />
        <div>
          <p className="font-display text-base tracking-wider text-[#E8D44D]">ECLIPSE FM</p>
          <p className="text-[9px] text-[#7B6FA0] tracking-widest uppercase">Equipo</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map((item) => {
          const active = isActive(item.href, item.exact);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                active
                  ? "text-[#E8D44D] bg-[rgba(232,212,77,0.08)]"
                  : "text-[#7B6FA0] hover:text-white hover:bg-[rgba(124,58,237,0.1)]"
              }`}
              style={active ? { borderLeft: "3px solid #E8D44D", paddingLeft: "calc(0.75rem - 3px)" } : {}}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
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
