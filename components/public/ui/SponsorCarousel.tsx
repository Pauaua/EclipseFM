"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const LOGOS: Record<string, string> = {
  "Aguas Mi Sur": "/logo-misur.png",
  "BikeCraft": "/logo-bikecraft.png",
  "Phantasia": "/logo-phantasia.png",
  "Asesorías Valdivia": "/logo-asesorias.png",
};

const URLS: Record<string, string> = {
  "Aguas Mi Sur": "https://www.aguasmisur.cl",
  "BikeCraft": "https://www.bikecraft.cl",
  "Phantasia": "https://phantasia.cl",
  "Asesorías Valdivia": "https://www.asesoriasvaldivia.cl",
};

const DESCRIPCIONES: Record<string, string> = {
  "Aguas Mi Sur": "Llevamos agua limpia y soluciones de saneamiento a quienes más lo necesitan. Compromiso, calidad y territorio en cada gota.",
  "BikeCraft": "Bicicletas y accesorios diseñados para quienes viven sobre dos ruedas. Calidad artesanal para el ciclista urbano y de ruta.",
  "Phantasia": "La imagen que tu mente concibe, hecha código. Desarrollo web, aplicaciones y software a medida para hacer realidad tu visión de negocio.",
  "Asesorías Valdivia": "Tu empresa en orden, tus números claros. Contabilidad, asesoría tributaria y gestión financiera para que te enfoques en crecer.",
};

type Sponsor = { id: string; empresa: string };

export function SponsorCarousel({ sponsors }: { sponsors: Sponsor[] }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % sponsors.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [sponsors.length, isHovered]);

  if (sponsors.length === 0) return null;

  const s = sponsors[current];
  const url = URLS[s.empresa] ?? "/";
  const isExternal = url.startsWith("http");

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0D0825 0%, #150A35 50%, #0D0825 100%)",
        borderTop: "1px solid rgba(124,58,237,0.15)",
        borderBottom: "1px solid rgba(124,58,237,0.15)",
      }}
    >
      {/* Fondo decorativo */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, rgba(232,212,77,0.3) 0%, transparent 70%)", filter: "blur(50px)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-14 md:py-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: "rgba(232,212,77,0.7)" }}>
              Nuestros auspiciadores
            </p>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wide leading-none">
              Marcas que eligen<br />
              <span style={{ color: "#E8D44D" }}>Eclipse FM</span>
            </h2>
          </div>
          <Link
            href="/contacto"
            className="self-start md:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
            style={{ border: "1px solid rgba(232,212,77,0.3)", color: "#E8D44D", background: "rgba(232,212,77,0.05)" }}
          >
            ¿Tu marca aquí? →
          </Link>
        </div>

        {/* Banner principal */}
        <div className="flex flex-col lg:flex-row gap-6 items-stretch">

          {/* Card activa — grande */}
          <a
            href={url}
            target={isExternal ? "_blank" : "_self"}
            rel={isExternal ? "noopener noreferrer" : undefined}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex-1 relative rounded-2xl overflow-hidden flex flex-col justify-between p-8 md:p-10 group cursor-pointer transition-transform duration-300 hover:scale-[1.01]"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(232,212,77,0.15)",
              backdropFilter: "blur(12px)",
              minHeight: "280px",
            }}
          >
            {/* Glow en hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
              style={{ background: "radial-gradient(ellipse at center, rgba(232,212,77,0.06) 0%, transparent 70%)" }}
            />

            {/* Logo */}
            <div className="relative w-40 h-20 md:w-52 md:h-24">
              {LOGOS[s.empresa] ? (
                <Image
                  src={LOGOS[s.empresa]}
                  alt={s.empresa}
                  fill
                  className="object-contain object-left"
                  sizes="(max-width: 768px) 160px, 208px"
                />
              ) : (
                <div
                  className="w-full h-full rounded-xl flex items-center justify-center text-3xl"
                  style={{ background: "rgba(124,58,237,0.1)", border: "1px dashed rgba(124,58,237,0.3)" }}
                >🏢</div>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="font-display text-2xl md:text-3xl text-white tracking-wide mb-2">{s.empresa}</p>
              <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(226,217,243,0.6)" }}>
                {DESCRIPCIONES[s.empresa] ?? s.empresa}
              </p>
              <p
                className="mt-4 text-xs font-semibold tracking-widest uppercase flex items-center gap-1.5 transition-all group-hover:gap-3"
                style={{ color: "#E8D44D" }}
              >
                Visitar sitio <span>→</span>
              </p>
            </div>
          </a>

          {/* Lista lateral — miniaturas */}
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 lg:w-64 flex-shrink-0">
            {sponsors.map((sp, i) => (
              <button
                key={sp.id}
                onClick={() => setCurrent(i)}
                className="flex-shrink-0 flex lg:flex-row items-center gap-3 p-3 rounded-xl text-left transition-all duration-200"
                style={{
                  background: i === current ? "rgba(232,212,77,0.08)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${i === current ? "rgba(232,212,77,0.25)" : "rgba(124,58,237,0.1)"}`,
                  minWidth: "140px",
                }}
              >
                <div className="w-10 h-10 relative flex-shrink-0">
                  {LOGOS[sp.empresa] ? (
                    <Image src={LOGOS[sp.empresa]} alt={sp.empresa} fill className="object-contain" sizes="40px" />
                  ) : (
                    <div className="w-full h-full rounded-lg flex items-center justify-center text-sm" style={{ background: "rgba(124,58,237,0.1)" }}>🏢</div>
                  )}
                </div>
                <div className="min-w-0">
                  <p
                    className="text-xs font-semibold truncate"
                    style={{ color: i === current ? "#E8D44D" : "rgba(226,217,243,0.7)" }}
                  >
                    {sp.empresa}
                  </p>
                  {i === current && (
                    <p className="text-[10px] mt-0.5" style={{ color: "rgba(232,212,77,0.5)" }}>Activo</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dots mobile */}
        <div className="flex items-center justify-center gap-2 mt-6 lg:hidden">
          {sponsors.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                background: i === current ? "#E8D44D" : "rgba(232,212,77,0.2)",
              }}
              aria-label={`Ir al auspiciador ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
