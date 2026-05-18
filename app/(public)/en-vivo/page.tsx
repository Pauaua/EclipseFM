"use client";

import { useState, useRef } from "react";
import { LiveDot } from "@/components/public/ui/LiveDot";
import { WaveBars } from "@/components/public/ui/WaveBars";

const STREAM_URL = "https://audio2.tustreaming.cl/8030/stream";
const CHAT_EMBED_URL = "https://www6.cbox.ws/box/?boxid=864700&boxtag=DXv1bJ";

export default function EnVivoPage() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const audioRef = useRef<HTMLAudioElement>(null);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }

  return (
    <div className="min-h-screen bg-space-deep">
      {/* Hero */}
      <section
        className="relative py-12 md:py-16 px-6 flex flex-col items-center text-center overflow-hidden"
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
        >107.7 FM · Quilicura</p>
        <WaveBars color={playing ? "#E8D44D" : "#4B4270"} bars={7} />
      </section>

      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">

          {/* ── PLAYER ── */}
          <div className="flex-1">
            <div
              className="rounded-2xl overflow-hidden p-5 sm:p-8 flex flex-col items-center gap-5"
              style={{
                background: "rgba(21,10,53,0.7)",
                border: "1px solid rgba(124,58,237,0.2)",
                boxShadow: playing ? "0 0 40px rgba(232,212,77,0.08)" : "none",
              }}
            >
              {/* Visualización */}
              <div
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-full flex items-center justify-center relative"
                style={{
                  background: "radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(8,4,26,0.8) 70%)",
                  border: "2px solid rgba(232,212,77,0.2)",
                  boxShadow: playing ? "0 0 60px rgba(232,212,77,0.15), 0 0 20px rgba(124,58,237,0.3)" : "none",
                }}
              >
                {playing && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping"
                    style={{ border: "1px solid rgba(232,212,77,0.15)" }}
                  />
                )}
                <span className="text-4xl sm:text-5xl">📻</span>
              </div>

              <div className="text-center">
                <p className="text-white font-semibold text-base sm:text-lg">Radio Eclipse FM</p>
                <p className="text-gray-mid text-sm">Transmisión en vivo · 107.7 MHz</p>
                {!STREAM_URL && (
                  <p className="text-yellow-DEFAULT text-xs mt-2 opacity-70">⚙️ Stream URL pendiente de configurar</p>
                )}
              </div>

              {/* Botón play */}
              <button
                onClick={togglePlay}
                disabled={!STREAM_URL}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold transition-all hover:scale-110 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  background: playing ? "rgba(239,68,68,0.8)" : "linear-gradient(135deg, #E8D44D, #F5E878)",
                  color: playing ? "#fff" : "#0D0825",
                  boxShadow: playing ? "0 0 24px rgba(239,68,68,0.4)" : "0 0 24px rgba(232,212,77,0.3)",
                }}
                aria-label={playing ? "Pausar" : "Reproducir"}
              >
                {playing ? "⏸" : "▶"}
              </button>

              {/* Volumen */}
              <div className="flex items-center gap-3 w-full max-w-xs">
                <span className="text-gray-mid text-sm">🔈</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={handleVolume}
                  className="flex-1 accent-yellow-400 cursor-pointer"
                />
                <span className="text-gray-mid text-sm">🔊</span>
              </div>

              {STREAM_URL && (
                <audio
                  ref={audioRef}
                  src={STREAM_URL}
                  preload="none"
                  onError={() => setPlaying(false)}
                />
              )}
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
              {[
                { icon: "📍", label: "Ubicación", value: "Quilicura, Chile" },
                { icon: "📻", label: "Frecuencia", value: "107.7 FM" },
                { icon: "🕐", label: "Transmisión", value: "24/7 Online" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl p-3 sm:p-4 flex sm:flex-col items-center sm:items-center gap-3 sm:gap-1"
                  style={{ background: "rgba(21,10,53,0.5)", border: "1px solid rgba(124,58,237,0.12)" }}
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div className="sm:text-center">
                    <p className="text-[10px] text-gray-mid uppercase tracking-widest">{item.label}</p>
                    <p className="text-white text-sm font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CHAT ── */}
          <div
            className="w-full lg:w-[380px] flex-shrink-0 rounded-2xl overflow-hidden flex flex-col"
            style={{
              border: "1px solid rgba(124,58,237,0.2)",
              background: "rgba(21,10,53,0.5)",
              minHeight: "420px",
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

            {CHAT_EMBED_URL ? (
              <iframe
                src={CHAT_EMBED_URL}
                className="flex-1 w-full border-0"
                allow="microphone; camera"
                title="Chat en vivo Eclipse FM"
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6 sm:p-8 text-center">
                <span className="text-5xl">💬</span>
                <div>
                  <p className="text-white font-semibold mb-1">Chat próximamente</p>
                  <p className="text-gray-soft text-sm leading-relaxed">
                    El chat en vivo estará disponible pronto. Mientras tanto, escríbenos por WhatsApp.
                  </p>
                </div>
                <a
                  href="https://wa.me/56974773659"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
                  style={{ background: "#25D366", color: "#fff" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Escríbenos al WhatsApp
                </a>
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}
