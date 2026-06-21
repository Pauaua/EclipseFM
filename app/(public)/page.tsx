import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Eclipse FM 107.7 — Quilicura, Chile",
  description: "Radio Eclipse FM 107.7 — Tu radio en el espacio. Música, noticias y entretenimiento desde Quilicura para Chile y el mundo. Transmisión 24/7 online y en el aire.",
  alternates: { canonical: "/" },
};
import { getPublishedPosts } from "@/lib/actions/posts.actions";
import { getPublishedNoticias } from "@/lib/actions/noticias.actions";
import { getPrograms } from "@/lib/actions/programs.actions";
import { prisma } from "@/lib/prisma";
import { SectionTag } from "@/components/public/ui/SectionTag";
import { SponsorCarousel } from "@/components/public/ui/SponsorCarousel";
import { SponsorScrollStrip } from "@/components/public/ui/SponsorScrollStrip";
import { ProgramCard } from "@/components/public/ui/ProgramCard";
import { BlogCardCompact, BlogCardGrid } from "@/components/public/ui/BlogCard";
import { NoticiaCardFeatured, NoticiaCardGrid } from "@/components/public/ui/NoticiaCard";
import { EclipseLogo } from "@/components/EclipseLogo";

async function getSponsors() {
  try { return await prisma.sponsor.findMany({ where: { activo: true }, take: 10 }); }
  catch { return []; }
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RadioStation",
  name: "Radio Eclipse FM",
  alternateName: "Eclipse FM 107.7",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.radioeclipsefm.cl",
  logo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.radioeclipsefm.cl"}/logo.png`,
  image: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.radioeclipsefm.cl"}/logo.png`,
  description: "Radio Eclipse FM 107.7 — Tu radio en el espacio. Música, noticias y entretenimiento desde Quilicura para Chile y el mundo.",
  broadcastFrequency: "107.7 FM",
  areaServed: {
    "@type": "City",
    name: "Quilicura",
    addressCountry: "CL",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+56-9-7477-3659",
    contactType: "customer service",
    email: "contacto@radioeclipsefm.cl",
    availableLanguage: "Spanish",
  },
  sameAs: [
    "https://www.facebook.com/radioeclipsefm",
    "https://www.instagram.com/radioeclipsefm",
  ],
};

export default async function HomePage() {
  const [posts, noticias, programas, sponsors] = await Promise.all([
    getPublishedPosts(),
    getPublishedNoticias(),
    getPrograms(true),
    getSponsors(),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_center,rgba(124,58,237,0.35)_0%,transparent_65%)]" />
        <div className="relative z-10 flex flex-col items-center gap-5">
          <div className="animate-float drop-shadow-[0_0_30px_rgba(124,58,237,0.5)]">
            <EclipseLogo size={140} />
          </div>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-widest"
            style={{ background: "rgba(232,212,77,0.1)", border: "1px solid rgba(232,212,77,0.22)", color: "#E8D44D" }}>
            ✦ QUILICURA · CHILE · ONLINE 24/7
          </div>
          <div>
            <h1 className="font-display tracking-wide text-white leading-none" style={{ fontSize: "clamp(48px,9vw,96px)" }}>
              RADIO ECLIPSE
            </h1>
            <p className="font-display leading-none" style={{
              fontSize: "clamp(28px,5vw,52px)",
              background: "linear-gradient(90deg,#E8D44D,#F5E878)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>107.7 FM</p>
            <p
              className="text-base sm:text-lg tracking-[0.35em] uppercase mt-2 font-light"
              style={{
                background: "linear-gradient(90deg, transparent 0%, #A89EC0 20%, #E8D44D 50%, #A89EC0 80%, transparent 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer-text 4s linear infinite",
              }}
            >
              La voz de Quilicura
            </p>
            <style>{`
              @keyframes shimmer-text {
                0%   { background-position: 200% center; }
                100% { background-position: -200% center; }
              }
            `}</style>
          </div>
          <p className="text-gray-soft text-sm sm:text-base max-w-[480px] w-full leading-relaxed px-4 sm:px-2">
            Música, noticias y entretenimiento desde Quilicura para Chile y el mundo. Más de 18 años siendo tu compañía en el espacio.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-2 w-full px-4 sm:px-0 sm:w-auto">
            <Link href="/en-vivo"
              className="px-7 py-3 rounded-full font-bold text-space-black text-sm transition-opacity hover:opacity-90"
              style={{ background: "linear-gradient(90deg,#E8D44D,#F5E878)" }}>
              ▶ Escuchar Ahora
            </Link>
            <Link href="/programacion"
              className="px-7 py-3 rounded-full font-semibold text-yellow-DEFAULT text-sm transition-colors hover:bg-yellow-soft"
              style={{ border: "1px solid rgba(232,212,77,0.22)" }}>
              Ver Programación →
            </Link>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-8 border-y border-purple-border/50" style={{ background: "rgba(8,4,26,0.7)" }}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-0 divide-x divide-purple-border/50">
          {[
            { num: "+10K", label: "Oyentes diarios" },
            { num: "18+", label: "Años al aire" },
            { num: "107.7", label: "Quilicura FM" },
            { num: "24/7", label: "Online & en el aire" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-4 px-1 sm:px-2">
              <span className="font-display text-2xl sm:text-3xl md:text-5xl" style={{
                background: "linear-gradient(90deg,#E8D44D,#F5E878)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>{s.num}</span>
              <span className="text-[11px] tracking-wide text-gray-mid uppercase mt-1">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPONSORS CAROUSEL ── */}
      {sponsors.length > 0 && <SponsorCarousel sponsors={sponsors} />}

      {/* ── PROGRAMAS DESTACADOS ── */}
      <section className="py-20 px-6 bg-space-deep">
        <div className="max-w-6xl mx-auto">
          <SectionTag text="En el aire" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wide mb-8 md:mb-10">Nuestra Programación</h2>
          {programas.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programas.slice(0, 3).map(p => <ProgramCard key={p.id} program={p} />)}
              </div>
              <div className="text-center mt-10">
                <Link href="/programas"
                  className="px-8 py-3 rounded-full text-sm font-semibold text-yellow-DEFAULT transition-colors hover:bg-yellow-soft"
                  style={{ border: "1px solid rgba(232,212,77,0.22)" }}>
                  Ver todos los programas →
                </Link>
              </div>
            </>
          ) : (
            <p className="text-gray-mid text-center py-12">Próximamente nuestra programación completa.</p>
          )}
        </div>
      </section>

      {/* ── BLOG PREVIEW ── */}
      <section className="py-20 px-6 bg-space-black">
        <div className="max-w-6xl mx-auto">
          <SectionTag text="Del estudio" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wide mb-8 md:mb-10">Últimas del Blog</h2>
          {posts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {posts.slice(0, 3).map(p => <BlogCardGrid key={p.id} post={p} />)}
              </div>
              <div className="text-center mt-10">
                <Link href="/blog"
                  className="px-8 py-3 rounded-full text-sm font-semibold text-yellow-DEFAULT transition-colors hover:bg-yellow-soft"
                  style={{ border: "1px solid rgba(232,212,77,0.22)" }}>
                  Ver todo el blog →
                </Link>
              </div>
            </>
          ) : (
            <p className="text-gray-mid text-center py-12">Pronto publicaremos nuestros primeros artículos.</p>
          )}
        </div>
      </section>

      {/* ── NOTICIAS PREVIEW ── */}
      <section className="py-20 px-6 bg-space-deep">
        <div className="max-w-6xl mx-auto">
          <SectionTag text="Quilicura hoy" />
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-white tracking-wide mb-8 md:mb-10">Últimas Noticias</h2>
          {noticias.length > 0 ? (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <NoticiaCardFeatured noticia={noticias[0]} />
                </div>
                <div className="flex flex-col gap-4">
                  {noticias.slice(1, 3).map(n => <NoticiaCardGrid key={n.id} noticia={n} />)}
                </div>
              </div>
              <div className="text-center mt-10">
                <Link href="/noticias"
                  className="px-8 py-3 rounded-full text-sm font-semibold text-yellow-DEFAULT transition-colors hover:bg-yellow-soft"
                  style={{ border: "1px solid rgba(232,212,77,0.22)" }}>
                  Ver todas las noticias →
                </Link>
              </div>
            </>
          ) : (
            <p className="text-gray-mid text-center py-12">Pronto las últimas noticias de Quilicura.</p>
          )}
        </div>
      </section>

      {/* ── SPONSOR SCROLL STRIP ── */}
      <SponsorScrollStrip sponsors={sponsors} />
    </>
  );
}
