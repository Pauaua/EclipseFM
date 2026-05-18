"use client";

import { useMemo } from "react";

export function StarField() {
  const stars = useMemo(() => {
    return Array.from({ length: 260 }, (_, i) => {
      const rand = Math.random();
      // Mayoría blancas, algunas amarillas, pocas púrpuras, rarísimas azules
      const color =
        rand < 0.05 ? "#E8D44D" :
        rand < 0.10 ? "#C084FC" :
        rand < 0.13 ? "#93C5FD" :
        "#ffffff";
      return {
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.4 + Math.random() * 2.2,
        opacity: 0.15 + Math.random() * 0.65,
        duration: 2.5 + Math.random() * 5,
        delay: Math.random() * 6,
        color,
      };
    });
  }, []);

  // Unas pocas estrellas más brillantes con halo
  const glowStars = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: Math.random() < 0.5 ? "#E8D44D" : "#C084FC",
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* Nebulosa de fondo — gradiente radial animado */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 20% 10%, rgba(124,58,237,0.08) 0%, transparent 60%)," +
            "radial-gradient(ellipse 60% 50% at 80% 80%, rgba(59,130,246,0.05) 0%, transparent 60%)," +
            "radial-gradient(ellipse 50% 40% at 60% 30%, rgba(232,212,77,0.03) 0%, transparent 55%)",
          animation: "nebula-drift 20s ease-in-out infinite alternate",
        }}
      />

      {/* Estrellas normales */}
      {stars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: "50%",
            backgroundColor: s.color,
            opacity: s.opacity,
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Estrellas con halo */}
      {glowStars.map((s) => (
        <div
          key={`glow-${s.id}`}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: "3px",
            height: "3px",
            borderRadius: "50%",
            backgroundColor: s.color,
            boxShadow: `0 0 6px 2px ${s.color}55`,
            animation: `twinkle ${s.duration}s ${s.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      <style>{`
        @keyframes nebula-drift {
          0%   { opacity: 0.6; transform: scale(1) translate(0, 0); }
          50%  { opacity: 1;   transform: scale(1.04) translate(1%, 1%); }
          100% { opacity: 0.7; transform: scale(0.98) translate(-1%, -0.5%); }
        }
      `}</style>
    </div>
  );
}
