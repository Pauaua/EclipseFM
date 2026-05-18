"use client";

export function WaveBars({ color = "#E8D44D", bars = 5 }: { color?: string; bars?: number }) {
  return (
    <div className="flex items-end gap-0.5 h-5">
      {Array.from({ length: bars }, (_, i) => (
        <div
          key={i}
          style={{
            width: "3px",
            height: "100%",
            backgroundColor: color,
            borderRadius: "2px",
            animation: `wave ${0.8 + i * 0.15}s ease-in-out infinite`,
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}
