"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: "#08041A" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(239,68,68,0.1) 0%, transparent 70%)" }}
      />
      <div className="relative z-10 flex flex-col items-center gap-5">
        <p
          className="font-display"
          style={{
            fontSize: "clamp(80px,20vw,180px)",
            lineHeight: 1,
            background: "linear-gradient(90deg,#ef4444,#f87171)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          500
        </p>
        <h1 className="font-display text-2xl sm:text-3xl text-white tracking-wide">
          Algo salió mal
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-sm leading-relaxed">
          Hubo un error inesperado en la señal. Por favor intenta nuevamente.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            onClick={reset}
            className="px-7 py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#E8D44D,#F5E878)", color: "#08041A" }}
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="px-7 py-3 rounded-full font-semibold text-sm transition-colors"
            style={{ border: "1px solid rgba(232,212,77,0.22)", color: "#E8D44D" }}
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
