import Link from "next/link";

interface PageHeroProps {
  breadcrumb: string;
  titleWhite: string;
  titleYellow: string;
  subtitle?: string;
}

export function PageHero({ breadcrumb, titleWhite, titleYellow, subtitle }: PageHeroProps) {
  return (
    <section
      className="relative min-h-[220px] flex flex-col justify-center px-6 py-12 overflow-hidden"
      style={{
        background: "radial-gradient(ellipse at top center, rgba(124,58,237,0.25) 0%, transparent 70%), #08041A",
        borderBottom: "1px solid rgba(124,58,237,0.1)",
      }}
    >
      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <p className="text-xs text-gray-mid mb-4">
          <Link href="/" className="hover:text-yellow-DEFAULT transition-colors">Inicio</Link>
          {" › "}
          <span className="text-gray-soft">{breadcrumb}</span>
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-wide leading-none mb-3">
          <span className="text-white block">{titleWhite}</span>
          <em className="not-italic text-yellow-DEFAULT block">{titleYellow}</em>
        </h1>
        {subtitle && (
          <p className="text-gray-soft text-sm sm:text-[15px] max-w-[520px] leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
