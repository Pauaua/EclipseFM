type Sponsor = { id: string; empresa: string };

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
            <div
              key={`${s.id}-${i}`}
              className="flex-shrink-0 flex flex-col items-center gap-1.5"
              title={s.empresa}
            >
              <div
                className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl sm:text-2xl"
                style={{
                  background: "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.18)",
                }}
              >
                🏢
              </div>
              <span className="text-[10px] sm:text-[11px] text-gray-mid whitespace-nowrap">{s.empresa}</span>
            </div>
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
