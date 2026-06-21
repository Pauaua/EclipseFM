"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

const LOGOS: Record<string, string> = {
  "Aguas Mi Sur": "/logo-misur.png",
  "BikeCraft": "/logo-bikecraft.png",
  "Phantasia": "/logo-phantasia.png",
  "Asesorías Valdivia": "/logo-asesorias.png",
  "Bodegón de la Cerámica": "/logobdc.png",
};

const URLS: Record<string, string> = {
  "Aguas Mi Sur": "https://www.aguasmisur.cl",
  "BikeCraft": "https://www.bikecraft.cl",
  "Phantasia": "https://phantasia.cl",
  "Asesorías Valdivia": "https://www.asesoriasvaldivia.cl",
  "Bodegón de la Cerámica": "https://www.elbodegondelaceramica.cl/",
};

const FLYERS: Record<string, string> = {
  "Bodegón de la Cerámica": "/BODEGONflayer.png",
};

const DESCRIPCIONES: Record<string, string> = {
  "Aguas Mi Sur": "Llevamos agua limpia y soluciones de saneamiento a quienes más lo necesitan. Compromiso, calidad y territorio en cada gota.",
  "BikeCraft": "Bicicletas y accesorios diseñados para quienes viven sobre dos ruedas. Calidad artesanal para el ciclista urbano y de ruta.",
  "Phantasia": "La imagen que tu mente concibe, hecha código. Desarrollo web, aplicaciones y software a medida para hacer realidad tu visión de negocio.",
  "Asesorías Valdivia": "Tu empresa en orden, tus números claros. Contabilidad, asesoría tributaria y gestión financiera para que te enfoques en crecer.",
  "Bodegón de la Cerámica": "Venta de revestimientos de pisos y muros: cerámicas, porcelanatos, alfombras, cubre pisos, linóleos, bloques de vidrio y molduras. Precios bajos siempre, productos de primera calidad.",
};

const HORARIOS: Record<string, string> = {
  "Bodegón de la Cerámica": "Lunes a Jueves de 08:15 a 17:30 hrs · Viernes de 08:15 a 17:00 hrs",
};

const DIRECCIONES: Record<string, string> = {
  "Bodegón de la Cerámica": "Ojos del Salado #821, Quilicura",
};

type Sponsor = { id: string; empresa: string };

const cardStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(232,212,77,0.15)",
  backdropFilter: "blur(12px)",
  minHeight: "280px",
};

export function SponsorCarousel({ sponsors }: { sponsors: Sponsor[] }) {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [flyerOpen, setFlyerOpen] = useState(false);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrent(i => (i + 1) % sponsors.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [sponsors.length, isHovered]);

  if (sponsors.length === 0) return null;

  const s = sponsors[current];
  const url = URLS[s.empresa] ?? "/";
  const isExternal = url.startsWith("http");
  const hasFlyer = !!FLYERS[s.empresa];
  const horario = HORARIOS[s.empresa];
  const direccion = DIRECCIONES[s.empresa];

  const cardClassName = "flex-1 relative rounded-2xl overflow-hidden flex flex-col justify-between p-8 md:p-10 group text-left transition-transform duration-300 hover:scale-[1.01]";

  // Contenido interior común (logo + nombre + descripción)
  const cardTop = (
    <>
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{ background: "radial-gradient(ellipse at center, rgba(232,212,77,0.06) 0%, transparent 70%)" }}
      />
      <div className="relative w-40 h-20 md:w-52 md:h-24">
        {LOGOS[s.empresa] ? (
          <Image src={LOGOS[s.empresa]} alt={s.empresa} fill className="object-contain object-left" sizes="(max-width: 768px) 160px, 208px" />
        ) : (
          <div className="w-full h-full rounded-xl flex items-center justify-center text-3xl" style={{ background: "rgba(124,58,237,0.1)", border: "1px dashed rgba(124,58,237,0.3)" }}>🏢</div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-end">
        <p className="font-display text-2xl md:text-3xl text-white tracking-wide mb-2">{s.empresa}</p>
        <p className="text-sm md:text-base leading-relaxed" style={{ color: "rgba(226,217,243,0.6)" }}>
          {DESCRIPCIONES[s.empresa] ?? s.empresa}
        </p>
      </div>
    </>
  );

  return (
    <>
      {/* Modal flyer */}
      {flyerOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(8,4,26,0.92)", backdropFilter: "blur(8px)" }}
          onClick={() => setFlyerOpen(false)}
        >
          <div className="relative max-w-2xl w-full" onClick={e => e.stopPropagation()}>
            {/* Barra superior del modal */}
            <div className="flex items-center justify-between mb-3 px-1">
              <a
                href={URLS["Bodegón de la Cerámica"]}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold tracking-widest uppercase transition-colors hover:text-white flex items-center gap-1.5"
                style={{ color: "#E8D44D" }}
              >
                Visitar página web →
              </a>
              <button
                onClick={() => setFlyerOpen(false)}
                className="text-sm transition-colors hover:text-white"
                style={{ color: "rgba(226,217,243,0.6)" }}
              >
                Cerrar ✕
              </button>
            </div>
            {/* Imagen del flyer */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(232,212,77,0.2)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/BODEGONflayer.png"
                alt="Ofertas Bodegón de la Cerámica — Quilicura"
                style={{ width: "100%", maxHeight: "80vh", objectFit: "contain", display: "block" }}
              />
            </div>
          </div>
        </div>
      )}

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
            {hasFlyer ? (
              /* Bodegón: card no-clickeable con fila inferior especial */
              <div
                className={cardClassName}
                style={cardStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {cardTop}
                {/* Horario */}
                {horario && (
                  <p className="mt-3 text-xs" style={{ color: "rgba(226,217,243,0.5)" }}>
                    {horario}
                  </p>
                )}
                {/* Fila inferior: dirección izq / ofertas der */}
                <div className="mt-4 flex items-center justify-between gap-4">
                  {direccion && (
                    <p className="text-xs" style={{ color: "rgba(226,217,243,0.45)" }}>
                      Dirección: {direccion}
                    </p>
                  )}
                  <button
                    onClick={() => setFlyerOpen(true)}
                    className="flex-shrink-0 text-xs font-semibold tracking-widest uppercase flex items-center gap-1.5 transition-all hover:gap-3"
                    style={{ color: "#E8D44D" }}
                  >
                    Ofertas Tienda Quilicura <span>→</span>
                  </button>
                </div>
              </div>
            ) : (
              <a
                href={url}
                target={isExternal ? "_blank" : "_self"}
                rel={isExternal ? "noopener noreferrer" : undefined}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={cardClassName}
                style={cardStyle}
              >
                {cardTop}
                <p className="mt-4 text-xs font-semibold tracking-widest uppercase flex items-center gap-1.5 transition-all group-hover:gap-3" style={{ color: "#E8D44D" }}>
                  Visitar sitio <span>→</span>
                </p>
              </a>
            )}

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
    </>
  );
}
