import type { Metadata } from "next";
import { getPublishedNoticias } from "@/lib/actions/noticias.actions";

export const metadata: Metadata = {
  title: "Noticias",
  description: "Últimas noticias de Quilicura y Chile en Eclipse FM 107.7. Información local en tiempo real.",
  openGraph: { title: "Noticias | Eclipse FM 107.7", description: "Últimas noticias de Quilicura y Chile en Eclipse FM 107.7." },
};
import { PageHero } from "@/components/public/ui/PageHero";
import { SectionTag } from "@/components/public/ui/SectionTag";
import { NoticiaCardFeatured, NoticiaCardGrid } from "@/components/public/ui/NoticiaCard";
import { SponsorSidebar } from "@/components/public/ui/SponsorSidebar";

export default async function NoticiasPage() {
  const noticias = await getPublishedNoticias();
  const featured = noticias[0];
  const rest = noticias.slice(1);

  return (
    <>
      <PageHero
        breadcrumb="Noticias"
        titleWhite="Quilicura"
        titleYellow="Hoy"
        subtitle="Las últimas noticias de Quilicura y la Región Metropolitana, al instante."
      />

      {/* Breaking news bar */}
      {featured && (
        <div
          className="py-3 px-6 flex items-center gap-3 overflow-hidden"
          style={{ background: "rgba(239,68,68,0.12)", borderBottom: "1px solid rgba(239,68,68,0.2)" }}
        >
          <span
            className="flex-shrink-0 text-[10px] font-bold tracking-widest px-2 py-1 rounded-sm"
            style={{ background: "rgba(239,68,68,0.8)", color: "#fff" }}
          >ÚLTIMA HORA</span>
          <p className="text-gray-soft text-sm truncate">{featured.titulo}</p>
        </div>
      )}

      <section className="py-20 px-6 bg-space-deep">
        <div className="max-w-6xl mx-auto">
          {noticias.length === 0 ? (
            <p className="text-gray-mid text-center py-20">Pronto las últimas noticias de Quilicura.</p>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Main 70% */}
              <div className="flex-1 min-w-0">
                {featured && (
                  <>
                    <SectionTag text="Destacada" />
                    <div className="mb-10">
                      <NoticiaCardFeatured noticia={featured} />
                    </div>
                  </>
                )}

                {rest.length > 0 && (
                  <>
                    <h3 className="font-display text-2xl text-white tracking-wide mb-6">Más noticias</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {rest.map(n => <NoticiaCardGrid key={n.id} noticia={n} />)}
                    </div>
                  </>
                )}
              </div>

              {/* Sidebar 30% */}
              <aside className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-8">
                <SponsorSidebar label="A" />
                <SponsorSidebar label="B" />
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
