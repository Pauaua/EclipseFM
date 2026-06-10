import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "linear-gradient(135deg, #08041A 0%, #150A35 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1.5px solid rgba(232,212,77,0.5)",
        }}
      >
        <div
          style={{
            fontSize: 14,
            fontWeight: 900,
            color: "#E8D44D",
            letterSpacing: -0.5,
            lineHeight: 1,
          }}
        >
          E
        </div>
      </div>
    ),
    { width: 32, height: 32 }
  );
}
