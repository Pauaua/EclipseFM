"use client";

import { useState, useTransition } from "react";
import { checkStreaming, type StreamStatus } from "@/lib/actions/streaming.actions";

type Results = { radio: StreamStatus; tv: StreamStatus };

function StatusBadge({ status }: { status: StreamStatus }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="w-2.5 h-2.5 rounded-full flex-shrink-0"
        style={{
          background: status.online ? "#34D399" : "#F87171",
          boxShadow: status.online ? "0 0 8px rgba(52,211,153,0.6)" : "0 0 8px rgba(248,113,113,0.4)",
        }}
      />
      <span
        className="text-sm font-semibold"
        style={{ color: status.online ? "#34D399" : "#F87171" }}
      >
        {status.online ? "En línea" : "Sin señal"}
      </span>
      {status.latency !== null && (
        <span className="text-xs text-[#7B6FA0] ml-1">{status.latency}ms</span>
      )}
    </div>
  );
}

function StreamCard({
  label,
  icon,
  url,
  status,
}: {
  label: string;
  icon: string;
  url: string;
  status: StreamStatus;
}) {
  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "#1C1040",
        border: `1px solid ${status.online ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}`,
      }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
          style={{ background: "rgba(124,58,237,0.1)" }}
        >
          {icon}
        </div>
        <div>
          <p className="text-white font-semibold">{label}</p>
          <p className="text-[#7B6FA0] text-xs truncate max-w-[200px]">{url}</p>
        </div>
      </div>

      <StatusBadge status={status} />

      <div className="mt-4 pt-4 border-t border-[rgba(124,58,237,0.1)] text-xs text-[#7B6FA0]">
        Verificado:{" "}
        {new Date(status.checkedAt).toLocaleTimeString("es-CL", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}
      </div>
    </div>
  );
}

export function StreamingClient({ initial }: { initial: Results }) {
  const [results, setResults] = useState<Results>(initial);
  const [isPending, startTransition] = useTransition();

  function refresh() {
    startTransition(async () => {
      const fresh = await checkStreaming();
      setResults(fresh);
    });
  }

  const allOnline = results.radio.online && results.tv.online;

  return (
    <div>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Estado del Streaming</h1>
          <p className="text-[#7B6FA0] text-sm mt-0.5">
            Monitoreo en tiempo real de las transmisiones de Eclipse FM
          </p>
        </div>
        <button
          onClick={refresh}
          disabled={isPending}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all disabled:opacity-50"
          style={{
            background: "rgba(124,58,237,0.15)",
            border: "1px solid rgba(124,58,237,0.3)",
            color: "#A89EC0",
          }}
        >
          <span className={isPending ? "animate-spin inline-block" : ""}>↻</span>
          {isPending ? "Verificando..." : "Actualizar"}
        </button>
      </div>

      {/* Estado general */}
      <div
        className="rounded-2xl p-5 mb-6 flex items-center gap-4"
        style={{
          background: allOnline ? "rgba(52,211,153,0.06)" : "rgba(248,113,113,0.06)",
          border: `1px solid ${allOnline ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}`,
        }}
      >
        <span className="text-3xl">{allOnline ? "✅" : "⚠️"}</span>
        <div>
          <p className="text-white font-semibold">
            {allOnline ? "Todas las transmisiones operativas" : "Hay señales con problemas"}
          </p>
          <p className="text-[#7B6FA0] text-sm">
            {allOnline
              ? "Radio y TV están en línea y respondiendo."
              : "Revisa los servicios marcados como sin señal."}
          </p>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <StreamCard
          label="Radio Eclipse FM"
          icon="📻"
          url="audio2.tustreaming.cl/8030/stream"
          status={results.radio}
        />
        <StreamCard
          label="Eclipse TV"
          icon="📺"
          url="tv.tustreaming.cl"
          status={results.tv}
        />
      </div>

      {/* Links de acceso rápido */}
      <div
        className="mt-6 rounded-2xl p-5"
        style={{ background: "#1C1040", border: "1px solid rgba(168,85,247,0.1)" }}
      >
        <p className="text-[#7B6FA0] text-xs uppercase tracking-widest mb-3">Acceso directo</p>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://play.tustreaming.cl/player.php?id=radioeclipsefm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[#A89EC0] transition-all hover:text-white"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}
          >
            📻 Player Radio
          </a>
          <a
            href="https://tv.tustreaming.cl/player.php?id=eclipsetv"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[#A89EC0] transition-all hover:text-white"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}
          >
            📺 Player TV
          </a>
          <a
            href="https://radioeclipsefm.cl:2083"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-[#A89EC0] transition-all hover:text-white"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}
          >
            ⚙️ Panel tustreaming
          </a>
        </div>
      </div>
    </div>
  );
}
