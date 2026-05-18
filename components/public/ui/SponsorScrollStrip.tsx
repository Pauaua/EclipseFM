import Image from "next/image";

type Sponsor = { id: string; empresa: string };

const LOGOS: Record<string, string> = {
  "Aguas Mi Sur": "/logo-misur.png",
  "BikeCraft": "/logo-bikecraft.png",
  "Phantasia": "/logo-phantasia.png",
};

const URLS: Record<string, string> = {
  "Aguas Mi Sur": "https://www.aguasmisur.cl",
  "BikeCraft": "/",
  "Phantasia": "https://phantasia.cl",
};

export function SponsorScrollStrip({ sponsors }: { sponsors: Sponsor[] }) {
  const items = [...sponsors, ...sponsors];

  return (
    <div
      className="w-full overflow-hidden py-6 sm:py-8"
      style={{
        background: "rgba(8,4,26,0.95)",
        borderTop: "1px solid rgba(124,58,237,0.12)",
      }}
    >
      <p
        className="text-center text-[10px] tracking-widest uppercase mb-5"
        style={{ color: "rgba(232,212,77,0.6)" }}
      >
        Confían en Eclipse FM
      </p>

      <div className="relative flex overflow-hidden">
        <div
          className="flex gap-8 sm:gap-12 items-center"
          style={{ animation: "scroll-sponsors 18s linear infinite" }}
        >
          {items.map((s, i) => (
            <a
              key={`${s.id}-${i}`}
              href={URLS[s.empresa] ?? "/"}
              target={URLS[s.empresa]?.startsWith("http") ? "_blank" : "_self"}
              rel={URLS[s.empresa]?.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex-shrink-0 flex flex-col items-center gap-1.5 transition-opacity hover:opacity-70"
              title={s.empresa}
            >
              <div className="w-11 h-11 sm:w-14 sm:h-14 relative flex items-center justify-center">
                {LOGOS[s.empresa] ? (
                  <Image src={LOGOS[s.empresa]} alt={s.empresa} fill className="object-contain" />
                ) : (
                  <div className="w-full h-full rounded-xl flex items-center justify-center text-xl" style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.18)" }}>🏢</div>
                )}
              </div>
              <span className="text-[10px] sm:text-[11px] text-gray-mid whitespace-nowrap">{s.empresa}</span>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll-sponsors {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
