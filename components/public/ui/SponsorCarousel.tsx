"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

type Sponsor = {
  id: string;
  empresa: string;
  descripcion?: string | null;
};

export function SponsorCarousel({ sponsors }: { sponsors: Sponsor[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % sponsors.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [sponsors.length]);

  function prev() {
    setCurrent(i => (i - 1 + sponsors.length) % sponsors.length);
  }

  function next() {
    setCurrent(i => (i + 1) % sponsors.length);
  }

  if (sponsors.length === 0) return null;

  const s = sponsors[current];

  return (
    <section className="py-16 px-6" style={{ background: "#F0EEF8" }}>
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-space-black tracking-wide mb-8">
          Marcas que eligen Eclipse FM
        </h2>

        {/* Card carousel */}
        <div className="relative flex items-center justify-center gap-3 sm:gap-4">
          {/* Flecha izquierda */}
          <button
            onClick={prev}
            className="w-11 h-11 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg transition-all hover:scale-110 active:scale-95"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", color: "#7C3AED" }}
            aria-label="Anterior"
          >
            ‹
          </button>

          {/* Card */}
          <a
            key={s.id}
            href={URLS[s.empresa] ?? "/"}
            target={URLS[s.empresa]?.startsWith("http") ? "_blank" : "_self"}
            rel={URLS[s.empresa]?.startsWith("http") ? "noopener noreferrer" : undefined}
            className="flex-1 rounded-2xl flex flex-col items-center justify-center gap-4 py-8 px-6 sm:py-10 sm:px-8 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl cursor-pointer"
            style={{
              background: "#fff",
              border: "1px solid #E5E0F5",
              boxShadow: "0 8px 32px rgba(124,58,237,0.1)",
              minHeight: "190px",
            }}
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 relative flex items-center justify-center">
              {LOGOS[s.empresa] ? (
                <Image src={LOGOS[s.empresa]} alt={s.empresa} fill className="object-contain" />
              ) : (
                <div className="w-full h-full rounded-xl flex items-center justify-center text-3xl" style={{ background: "#F5F3FF", border: "1px dashed #C4B5FD" }}>🏢</div>
              )}
            </div>
            <div className="text-center">
              <p className="font-display text-xl sm:text-2xl text-space-black tracking-wide">{s.empresa}</p>
              {s.descripcion && (
                <p className="text-gray-500 text-sm mt-1">{s.descripcion}</p>
              )}
            </div>
          </a>

          {/* Flecha derecha */}
          <button
            onClick={next}
            className="w-11 h-11 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg transition-all hover:scale-110 active:scale-95"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", color: "#7C3AED" }}
            aria-label="Siguiente"
          >
            ›
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-5">
          {sponsors.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                background: i === current ? "#7C3AED" : "#D1C4E9",
              }}
              aria-label={`Ir al auspiciador ${i + 1}`}
            />
          ))}
        </div>

        <Link
          href="/contacto"
          className="inline-block mt-6 text-sm text-purple-600 hover:text-yellow-600 transition-colors"
        >
          ¿Tu marca aquí? Contáctanos →
        </Link>
      </div>
    </section>
  );
}
