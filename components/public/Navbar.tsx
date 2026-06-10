"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { EclipseLogo } from "@/components/EclipseLogo";
import { LiveDot } from "@/components/public/ui/LiveDot";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/programas", label: "Programas" },
  { href: "/programacion", label: "Programación" },
  { href: "/blog", label: "Blog" },
  { href: "/noticias", label: "Noticias" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  }

  return (
    <>
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10"
        style={{
          height: "68px",
          background: "rgba(8,4,26,0.88)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(124,58,237,0.12)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
          <EclipseLogo size={44} />
          <div>
            <p className="text-[9px] text-gray-mid tracking-widest uppercase leading-none">Radio</p>
            <p className="font-display text-base text-white leading-none tracking-wide">Eclipse FM</p>
          </div>
        </Link>

        {/* Nav desktop */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="relative text-[12px] font-semibold tracking-wide transition-colors duration-200"
                style={{ color: active ? "#E8D44D" : "#A89EC0" }}
                onMouseEnter={e => { if (!active) (e.target as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { if (!active) (e.target as HTMLElement).style.color = "#A89EC0"; }}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-yellow-DEFAULT" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Botón EN VIVO + hamburguesa */}
        <div className="flex items-center gap-3">
          <Link
            href="/en-vivo"
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-widest transition-all hover:scale-105"
            style={{
              background: "rgba(239,68,68,0.15)",
              border: "1px solid rgba(239,68,68,0.35)",
              color: "#FCA5A5",
            }}
          >
            <LiveDot />
            EN VIVO
          </Link>
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <span className="w-5 h-0.5 bg-gray-soft block" />
            <span className="w-5 h-0.5 bg-gray-soft block" />
            <span className="w-3 h-0.5 bg-gray-soft block" />
          </button>
        </div>
      </nav>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div
            className="absolute right-0 top-0 h-full w-64 sm:w-72 flex flex-col py-10 px-6 sm:px-8"
            style={{ background: "#09051E" }}
          >
            <button
              className="absolute top-5 right-5 text-gray-soft hover:text-white text-xl"
              onClick={() => setOpen(false)}
            >✕</button>
            <div className="flex flex-col gap-6 mt-8">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-xl sm:text-2xl tracking-wide transition-colors"
                  style={{ color: isActive(l.href) ? "#E8D44D" : "#A89EC0" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
