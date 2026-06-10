import Link from "next/link";
import { EclipseLogo } from "@/components/EclipseLogo";

export async function Footer() {

  return (
    <footer
      className="pb-16"
      style={{
        background: "#08041A",
        borderTop: "1px solid rgba(124,58,237,0.08)",
        paddingTop: "64px",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-10 md:mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <EclipseLogo size={40} />
              <div>
                <p className="font-display text-lg text-white tracking-wide">ECLIPSE FM</p>
                <p className="text-[10px] text-gray-mid tracking-widest">107.7</p>
              </div>
            </div>
            <p className="text-gray-soft text-[13px] leading-relaxed mb-5">
              Tu radio en el espacio. Música, noticias y entretenimiento desde Quilicura para Chile y el mundo.
            </p>
            <div className="flex gap-3">
              {[
                { icon: "f", label: "Facebook", href: "https://www.facebook.com/eclipsefmquilicura" },
                { icon: "ig", label: "Instagram", href: "https://www.instagram.com/radio__eclipse/" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-gray-soft hover:text-yellow-DEFAULT transition-all hover:scale-110"
                  style={{ border: "1px solid rgba(124,58,237,0.2)" }}
                  title={s.label}
                >
                  <span className="text-xs font-bold">{s.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-yellow-DEFAULT mb-4">Navegación</p>
            <div className="flex flex-col gap-2">
              {[
                { href: "/", label: "Inicio" },
                { href: "/nosotros", label: "Nosotros" },
                { href: "/programas", label: "Programas" },
                { href: "/programacion", label: "Programación" },
                { href: "/blog", label: "Blog" },
                { href: "/noticias", label: "Noticias" },
                { href: "/contacto", label: "Contacto" },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-gray-soft text-sm hover:text-yellow-DEFAULT transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Programas */}
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-yellow-DEFAULT mb-4">Programas</p>
            <div className="flex flex-col gap-2 text-gray-soft text-sm">
              {["Voces de Chile", "Entre Boleros", "Tarde de Locura", "Foro Ciudadano", "Proyecto 90"].map(p => (
                <Link key={p} href="/programas" className="hover:text-yellow-DEFAULT transition-colors">{p}</Link>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <p className="text-[10px] font-semibold tracking-widest uppercase text-yellow-DEFAULT mb-4">Contacto</p>
            <div className="flex flex-col gap-3 text-gray-soft text-sm">
              <p>📍 Av. O'Higgins #208 con Lo Bascuñán, Quilicura</p>
              <p>📻 107.7 FM</p>
              <p>📞 +56 9 7477 3659</p>
              <p>✉️ contacto@radioeclipsefm.cl</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-dark">© {new Date().getFullYear()} Radio Eclipse FM 107.7. Todos los derechos reservados.</p>
          <p className="text-xs text-gray-dark">Quilicura, Chile</p>
        </div>
      </div>
    </footer>
  );
}
