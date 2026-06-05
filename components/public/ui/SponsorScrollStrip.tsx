import Image from "next/image";

type Sponsor = { id: string; empresa: string };

// Isotipo (versión compacta) — usar cuando esté disponible, si no usar logo normal
const ISOTIPOS: Record<string, string> = {
  "Aguas Mi Sur": "/logo-misur.png",
  "BikeCraft": "/logo-bikecraft.png",
  "Phantasia": "/logo-phantasia.png",
  "Asesorías Valdivia": "/isotipo-asesorias.png",
};

const URLS: Record<string, string> = {
  "Aguas Mi Sur": "https://www.aguasmisur.cl",
  "BikeCraft": "https://www.bikecraft.cl",
  "Phantasia": "https://phantasia.cl",
  "Asesorías Valdivia": "https://www.asesoriasvaldivia.cl",
};

export function SponsorScrollStrip({ sponsors }: { sponsors: Sponsor[] }) {
  // triplicar para scroll fluido
  const items = [...sponsors, ...sponsors, ...sponsors];

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #08041A 0%, #0D0825 50%, #08041A 100%)",
        borderTop: "1px solid rgba(124,58,237,0.1)",
        borderBottom: "1px solid rgba(124,58,237,0.1)",
      }}
    >
      {/* Línea superior decorativa */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(232,212,77,0.3), transparent)" }} />

      <div className="py-5 flex items-center gap-8 px-6">
        {/* Label fijo */}
        <p
          className="text-[9px] tracking-[0.25em] uppercase whitespace-nowrap flex-shrink-0 hidden sm:block"
          style={{ color: "rgba(232,212,77,0.5)" }}
        >
          Confían en Eclipse FM
        </p>
        <div className="w-px h-6 flex-shrink-0 hidden sm:block" style={{ background: "rgba(124,58,237,0.3)" }} />

        {/* Scroll infinito */}
        <div className="relative flex overflow-hidden flex-1">
          {/* Fades laterales */}
          <div className="absolute left-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: "linear-gradient(90deg, #08041A, transparent)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-8 z-10 pointer-events-none" style={{ background: "linear-gradient(270deg, #08041A, transparent)" }} />

          <div
            className="flex gap-10 sm:gap-14 items-center"
            style={{ animation: "scroll-sponsors 22s linear infinite" }}
          >
            {items.map((s, i) => (
              <a
                key={`${s.id}-${i}`}
                href={URLS[s.empresa] ?? "/"}
                target={URLS[s.empresa]?.startsWith("http") ? "_blank" : "_self"}
                rel={URLS[s.empresa]?.startsWith("http") ? "noopener noreferrer" : undefined}
                className="flex-shrink-0 flex items-center gap-2.5 group transition-all duration-300 hover:opacity-60"
                title={s.empresa}
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 relative flex-shrink-0">
                  {ISOTIPOS[s.empresa] ? (
                    <Image
                      src={ISOTIPOS[s.empresa]}
                      alt={s.empresa}
                      fill
                      className="object-contain"
                      sizes="32px"
                    />
                  ) : (
                    <div
                      className="w-full h-full rounded flex items-center justify-center text-xs"
                      style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.18)" }}
                    >🏢</div>
                  )}
                </div>
                <span
                  className="text-[11px] sm:text-xs font-medium whitespace-nowrap transition-colors"
                  style={{ color: "rgba(226,217,243,0.45)" }}
                >
                  {s.empresa}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(124,58,237,0.2), transparent)" }} />

      <style>{`
        @keyframes scroll-sponsors {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
