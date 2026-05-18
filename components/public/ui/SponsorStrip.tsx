type Sponsor = { id: string; empresa: string; contacto: string; descripcion?: string | null };

export function SponsorStrip({ sponsors }: { sponsors: Sponsor[] }) {
  const display = sponsors.length > 0
    ? sponsors
    : [
        { id: "a", empresa: "A", contacto: "" },
        { id: "b", empresa: "B", contacto: "" },
        { id: "c", empresa: "C", contacto: "" },
        { id: "d", empresa: "D", contacto: "" },
      ];

  return (
    <div
      className="w-full overflow-x-auto"
      style={{
        background: "rgba(21,10,53,0.6)",
        borderTop: "1px solid rgba(124,58,237,0.08)",
        borderBottom: "1px solid rgba(124,58,237,0.08)",
        height: "72px",
      }}
    >
      <div className="flex items-center justify-center h-full px-8 gap-0 min-w-max mx-auto">
        <span className="text-[10px] text-gray-mid tracking-widest uppercase mr-8 flex-shrink-0">
          Auspician:
        </span>
        {display.map((s, i) => (
          <div key={s.id} className="flex items-center h-full">
            {/* Logo placeholder — reemplazar con <Image> cuando se tengan los logos */}
            <div
              className="mx-6 w-10 h-10 rounded-lg flex items-center justify-center text-xl"
              style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.15)" }}
              title={s.empresa}
            >
              🏢
            </div>
            {i < display.length - 1 && (
              <div className="h-6 w-px bg-purple-border/30 flex-shrink-0" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
