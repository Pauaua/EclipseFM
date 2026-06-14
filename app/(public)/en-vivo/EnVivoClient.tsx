"use client";

import { useState } from "react";
import { LiveDot } from "@/components/public/ui/LiveDot";
import { WaveBars } from "@/components/public/ui/WaveBars";

const RADIO_EMBED = "https://play.tustreaming.cl/player.php?id=radioeclipsefm";
const TV_EMBED = "https://tv.tustreaming.cl/player.php?id=eclipsetv";
const CHAT_EMBED = "https://www6.cbox.ws/box/?boxid=864700&boxtag=DXv1bJ";

export default function EnVivoPage() {
  const [tab, setTab] = useState<"radio" | "tv">("radio");

  return (
    <div className="min-h-screen bg-space-deep">

      {/* ── HERO ── */}
      <section
        className="relative py-10 md:py-14 px-6 flex flex-col items-center text-center overflow-hidden"
        style={{
          background: "radial-gradient(ellipse at top center, rgba(239,68,68,0.18) 0%, rgba(124,58,237,0.12) 40%, transparent 70%), #08041A",
          borderBottom: "1px solid rgba(124,58,237,0.1)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <LiveDot />
          <span
            className="text-[11px] font-bold tracking-widest px-3 py-1 rounded-full"
            style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.35)", color: "#FCA5A5" }}
          >
            EN VIVO AHORA
          </span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-wide mb-2">Eclipse FM</h1>
        <p
          className="font-display text-xl sm:text-2xl md:text-3xl mb-5"
          style={{
            background: "linear-gradient(90deg,#E8D44D,#F5E878)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          107.7 FM · Quilicura
        </p>
        <WaveBars color="#E8D44D" bars={7} />
      </section>

      {/* ── CONTENIDO ── */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* ── COLUMNA PRINCIPAL ── */}
          <div className="flex-1 min-w-0">

            {/* Tabs Radio / TV */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setTab("radio")}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all"
                style={
                  tab === "radio"
                    ? { background: "linear-gradient(90deg,#E8D44D,#F5E878)", color: "#0D0825" }
                    : { background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", color: "#A89EC0" }
                }
              >
                📻 Radio
              </button>
              <button
                onClick={() => setTab("tv")}
                className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all"
                style={
                  tab === "tv"
                    ? { background: "linear-gradient(90deg,#E8D44D,#F5E878)", color: "#0D0825" }
                    : { background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", color: "#A89EC0" }
                }
              >
                📺 Eclipse TV
              </button>
            </div>

            {/* Player */}
            <div
              className="rounded-2xl overflow-hidden w-full"
              style={{
                border: "1px solid rgba(124,58,237,0.2)",
                background: "#000",
                aspectRatio: tab === "tv" ? "16/9" : undefined,
              }}
            >
              {tab === "radio" ? (
                <iframe
                  src={RADIO_EMBED}
                  allow="autoplay; encrypted-media"
                  scrolling="no"
                  title="Eclipse FM Radio en vivo"
                  className="w-full border-0 block"
                  style={{ height: "180px" }}
                />
              ) : (
                <iframe
                  src={TV_EMBED}
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                  referrerPolicy="origin"
                  title="Eclipse TV en vivo"
                  className="w-full h-full border-0 block"
                  style={{ minHeight: "240px", aspectRatio: "16/9" }}
                />
              )}
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 mt-4">
              {[
                { icon: "📍", label: "Ubicación", value: "Quilicura, Chile" },
                { icon: "📻", label: "Frecuencia", value: "107.7 FM" },
                { icon: "🕐", label: "Transmisión", value: "24/7 Online" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-2 sm:p-4 flex flex-col items-center gap-1"
                  style={{ background: "rgba(21,10,53,0.5)", border: "1px solid rgba(124,58,237,0.12)" }}
                >
                  <span className="text-xl sm:text-2xl">{item.icon}</span>
                  <div className="text-center">
                    <p className="text-[9px] sm:text-[10px] text-gray-mid uppercase tracking-widest leading-tight">{item.label}</p>
                    <p className="text-white text-xs sm:text-sm font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CHAT ── */}
          <div
            className="w-full lg:w-[360px] flex-shrink-0 rounded-2xl overflow-hidden flex flex-col"
            style={{
              border: "1px solid rgba(124,58,237,0.2)",
              background: "rgba(21,10,53,0.5)",
              minHeight: "400px",
            }}
          >
            <div
              className="px-5 py-3 flex items-center gap-2 flex-shrink-0"
              style={{ borderBottom: "1px solid rgba(124,58,237,0.15)", background: "rgba(8,4,26,0.6)" }}
            >
              <span className="text-sm">💬</span>
              <p className="text-white text-sm font-semibold">Chat en vivo</p>
              <div className="ml-auto flex items-center gap-1.5">
                <LiveDot />
                <span className="text-[10px] text-gray-mid">En línea</span>
              </div>
            </div>
            <iframe
              src={CHAT_EMBED}
              className="flex-1 w-full border-0"
              allow="microphone; camera"
              title="Chat en vivo Eclipse FM"
            />
          </div>

        </div>
      </section>
    </div>
  );
}
