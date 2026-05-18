import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/actions/posts.actions";
import { PageHero } from "@/components/public/ui/PageHero";
import { SectionTag } from "@/components/public/ui/SectionTag";
import { BlogCardFeatured, BlogCardGrid } from "@/components/public/ui/BlogCard";
import { SponsorSidebar } from "@/components/public/ui/SponsorSidebar";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos, historias y novedades del equipo de Eclipse FM 107.7 desde Quilicura.",
  openGraph: { title: "Blog | Eclipse FM 107.7", description: "Artículos, historias y novedades del equipo de Eclipse FM 107.7 desde Quilicura." },
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      <PageHero
        breadcrumb="Blog"
        titleWhite="Del Estudio"
        titleYellow="al Aire"
        subtitle="Artículos, entrevistas y reflexiones del equipo de Eclipse FM 107.7."
      />

      <section className="py-20 px-6 bg-space-deep">
        <div className="max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-gray-mid text-center py-20">Pronto publicaremos nuestros primeros artículos.</p>
          ) : (
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Main content 70% */}
              <div className="flex-1 min-w-0">
                {featured && (
                  <>
                    <SectionTag text="Destacado" />
                    <div className="mb-10">
                      <BlogCardFeatured post={featured} />
                    </div>
                  </>
                )}

                {rest.length > 0 && (
                  <>
                    <h3 className="font-display text-2xl text-white tracking-wide mb-6">Más artículos</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {rest.map(p => <BlogCardGrid key={p.id} post={p} />)}
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
