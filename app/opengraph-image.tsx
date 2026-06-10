import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Eclipse FM 107.7 — Quilicura, Chile";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #08041A 0%, #150A35 50%, #0D0825 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow de fondo */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(124,58,237,0.35) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: 100,
            width: 400,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(232,212,77,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Frecuencia decorativa */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 6,
            color: "rgba(168,85,247,0.7)",
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          RADIO • QUILICURA • CHILE
        </div>

        {/* Logotipo texto */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: "#E8D44D",
            letterSpacing: -2,
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          ECLIPSE FM
        </div>

        {/* Frecuencia */}
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "rgba(255,255,255,0.85)",
            letterSpacing: 4,
            marginBottom: 32,
          }}
        >
          107.7
        </div>

        {/* Separador */}
        <div
          style={{
            width: 120,
            height: 3,
            background: "linear-gradient(90deg, transparent, #E8D44D, transparent)",
            marginBottom: 28,
            borderRadius: 4,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(226,217,243,0.7)",
            letterSpacing: 2,
            fontWeight: 400,
          }}
        >
          Tu radio en el espacio · 24/7 Online
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 15,
            color: "rgba(124,58,237,0.6)",
            letterSpacing: 1,
          }}
        >
          www.radioeclipsefm.cl
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
