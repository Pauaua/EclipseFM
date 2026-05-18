import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-center px-6"
      style={{ background: "#08041A" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)" }}
      />
      <div className="relative z-10 flex flex-col items-center gap-5">
        <p
          className="font-display"
          style={{
            fontSize: "clamp(80px,20vw,180px)",
            lineHeight: 1,
            background: "linear-gradient(90deg,#E8D44D,#F5E878)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </p>
        <h1 className="font-display text-2xl sm:text-3xl text-white tracking-wide">
          Página no encontrada
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-sm leading-relaxed">
          Esta frecuencia no existe. Quizás la página fue movida o ya no está disponible.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link
            href="/"
            className="px-7 py-3 rounded-full font-bold text-sm transition-opacity hover:opacity-90"
            style={{ background: "linear-gradient(90deg,#E8D44D,#F5E878)", color: "#08041A" }}
          >
            Volver al inicio
          </Link>
          <Link
            href="/en-vivo"
            className="px-7 py-3 rounded-full font-semibold text-sm transition-colors"
            style={{ border: "1px solid rgba(232,212,77,0.22)", color: "#E8D44D" }}
          >
            ▶ Escuchar en vivo
          </Link>
        </div>
      </div>
    </div>
  );
}
