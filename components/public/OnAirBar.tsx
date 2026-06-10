"use client";

import Link from "next/link";
import { WaveBars } from "@/components/public/ui/WaveBars";
import { LiveDot } from "@/components/public/ui/LiveDot";

export function OnAirBar() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8"
      style={{
        height: "56px",
        background: "rgba(8,4,26,0.96)",
        backdropFilter: "blur(16px)",
        borderTop: "1px solid rgba(124,58,237,0.15)",
      }}
    >
      {/* Izquierda */}
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold tracking-widest"
          style={{
            background: "rgba(239,68,68,0.15)",
            border: "1px solid rgba(239,68,68,0.35)",
            color: "#FCA5A5",
          }}
        >
          <LiveDot />
          EN VIVO
        </div>
        <div className="hidden sm:block">
          <p className="text-white text-xs font-semibold leading-none">Eclipse FM 107.7</p>
          <p className="text-gray-mid text-[10px] mt-0.5">Quilicura · Chile</p>
        </div>
      </div>

      {/* Centro */}
      <WaveBars color="#E8D44D" bars={5} />

      {/* Derecha */}
      <Link
        href="/en-vivo"
        className="w-11 h-11 rounded-full flex items-center justify-center text-space-black text-sm font-bold transition-transform hover:scale-110"
        style={{ background: "linear-gradient(135deg, #E8D44D, #F5E878)" }}
        aria-label="Ir al reproductor en vivo"
      >
        ▶
      </Link>
    </div>
  );
}
