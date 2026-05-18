import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getPublishedNoticiaBySlug, getPublishedNoticias } from "@/lib/actions/noticias.actions";
import { NoticiaCardGrid } from "@/components/public/ui/NoticiaCard";
import { SponsorSidebar } from "@/components/public/ui/SponsorSidebar";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const noticia = await getPublishedNoticiaBySlug(params.slug);
  if (!noticia) return { title: "Noticia no encontrada" };
  return {
    title: noticia.titulo,
    description: noticia.resumen ?? `Última noticia de Quilicura en Eclipse FM 107.7`,
    openGraph: {
      title: noticia.titulo,
      description: noticia.resumen ?? `Última noticia de Quilicura en Eclipse FM 107.7`,
      type: "article",
      publishedTime: noticia.createdAt.toISOString(),
      authors: [noticia.autor],
      images: noticia.imagen ? [{ url: noticia.imagen }] : [{ url: "/logo.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: noticia.titulo,
      description: noticia.resumen ?? `Última noticia de Quilicura en Eclipse FM 107.7`,
    },
  };
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
}

export default async function NoticiaPage({ params }: { params: { slug: string } }) {
  const [noticia, allNoticias] = await Promise.all([
    getPublishedNoticiaBySlug(params.slug),
    getPublishedNoticias(),
  ]);

  if (!noticia) notFound();

  const related = allNoticias.filter(n => n.id !== noticia.id).slice(0, 4);

  return (
    <div className="bg-space-deep min-h-screen">
      {/* Hero */}
      <section
        className="relative py-20 px-6"
        style={{
          background: "radial-gradient(ellipse at top center, rgba(239,68,68,0.1) 0%, transparent 70%), #08041A",
          borderBottom: "1px solid rgba(124,58,237,0.1)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-mid mb-6">
            <Link href="/" className="hover:text-yellow-DEFAULT transition-colors">Inicio</Link>
            {" › "}
            <Link href="/noticias" className="hover:text-yellow-DEFAULT transition-colors">Noticias</Link>
            {" › "}
            <span className="text-gray-soft">{noticia.titulo}</span>
          </p>
          <div className="flex items-center gap-3 mb-4">
            <span
              className="text-[10px] font-bold tracking-widest px-2 py-1 rounded-sm"
              style={{ background: "rgba(239,68,68,0.7)", color: "#fff" }}
            >NOTICIAS</span>
            <span className="text-gray-mid text-xs">{formatDate(noticia.createdAt)}</span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white tracking-wide leading-tight mb-6">{noticia.titulo}</h1>
          {noticia.resumen && (
            <p className="text-gray-soft text-lg leading-relaxed mb-6">{noticia.resumen}</p>
          )}
          <div className="flex items-center gap-3 text-sm text-gray-mid">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "rgba(239,68,68,0.3)" }}
            >
              {noticia.autor[0]}
            </div>
            <span className="text-gray-soft font-medium">{noticia.autor}</span>
          </div>
        </div>
      </section>

      {/* Imagen */}
      <div className="max-w-5xl mx-auto px-6 pt-10">
        <div
          className="w-full rounded-2xl overflow-hidden flex items-center justify-center mb-10"
          style={{
            height: "300px",
            background: "linear-gradient(135deg, rgba(59,130,246,0.2) 0%, rgba(21,10,53,0.8) 100%)",
            border: "1px solid rgba(124,58,237,0.15)",
          }}
        >
          <span className="text-7xl">📰</span>
        </div>
      </div>

      {/* Contenido + Sidebar */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          <article className="flex-1 min-w-0">
            <div className="text-gray-soft leading-relaxed" style={{ fontSize: "16px", lineHeight: "1.8" }}>
              {noticia.contenido.split("\n").map((paragraph, i) =>
                paragraph.trim() ? (
                  <p key={i} className="mb-4 text-gray-soft">{paragraph}</p>
                ) : (
                  <br key={i} />
                )
              )}
            </div>

            <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(124,58,237,0.15)" }}>
              <Link href="/noticias" className="text-sm text-yellow-DEFAULT hover:text-white transition-colors font-semibold">
                ← Volver a Noticias
              </Link>
            </div>
          </article>

          <aside className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-8">
            <SponsorSidebar label="A" />

            {related.length > 0 && (
              <div>
                <p className="text-[10px] text-gray-dark uppercase tracking-widest mb-3">Otras noticias</p>
                <div className="flex flex-col gap-3">
                  {related.map(n => (
                    <Link key={n.id} href={`/noticias/${n.slug}`} className="group">
                      <div
                        className="rounded-lg p-3 transition-all hover:border-yellow-border"
                        style={{ background: "rgba(21,10,53,0.5)", border: "1px solid rgba(124,58,237,0.12)" }}
                      >
                        <p className="text-white text-sm font-medium group-hover:text-yellow-DEFAULT transition-colors line-clamp-2">{n.titulo}</p>
                        <p className="text-gray-mid text-xs mt-1">{formatDate(n.createdAt)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <SponsorSidebar label="B" />
          </aside>
        </div>
      </div>

      {related.length > 0 && (
        <section className="py-16 px-6 bg-space-black">
          <div className="max-w-5xl mx-auto">
            <h3 className="font-display text-3xl text-white tracking-wide mb-8">Más Noticias</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map(n => <NoticiaCardGrid key={n.id} noticia={n} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
