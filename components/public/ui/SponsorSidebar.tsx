import Link from "next/link";

export function SponsorSidebar({ label = "A" }: { label?: string }) {
  return (
    <div className="w-full">
      <p className="text-[9px] text-gray-dark uppercase tracking-widest mb-1">Publicidad</p>
      <div
        className="rounded-lg flex flex-col items-center justify-center gap-3 p-6 text-center"
        style={{
          minHeight: "180px",
          border: "1px dashed rgba(124,58,237,0.2)",
          background: "linear-gradient(135deg, rgba(21,10,53,0.8) 0%, rgba(28,16,64,0.6) 100%)",
        }}
      >
        <span className="text-3xl">🏢</span>
        <span className="font-display text-2xl text-white tracking-wide">SPONSOR {label}</span>
        <span className="text-[11px] text-gray-soft">Espacio publicitario</span>
        <Link
          href="/contacto"
          className="text-xs px-3 py-1.5 rounded-full border border-yellow-border text-yellow-DEFAULT hover:bg-yellow-soft transition-colors"
        >
          Contactar
        </Link>
      </div>
    </div>
  );
}
