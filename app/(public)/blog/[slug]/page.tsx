import { notFound } from "next/navigation";
import Link from "next/link";
import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/actions/posts.actions";
import { BlogCardGrid } from "@/components/public/ui/BlogCard";
import { SponsorSidebar } from "@/components/public/ui/SponsorSidebar";

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const [post, allPosts] = await Promise.all([
    getPublishedPostBySlug(params.slug),
    getPublishedPosts(),
  ]);

  if (!post) notFound();

  const related = allPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <div className="bg-space-deep min-h-screen">
      {/* Hero del artículo */}
      <section
        className="relative py-20 px-6"
        style={{
          background: "radial-gradient(ellipse at top center, rgba(124,58,237,0.2) 0%, transparent 70%), #08041A",
          borderBottom: "1px solid rgba(124,58,237,0.1)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-xs text-gray-mid mb-6">
            <Link href="/" className="hover:text-yellow-DEFAULT transition-colors">Inicio</Link>
            {" › "}
            <Link href="/blog" className="hover:text-yellow-DEFAULT transition-colors">Blog</Link>
            {" › "}
            <span className="text-gray-soft">{post.titulo}</span>
          </p>
          <span className="inline-block text-[10px] font-semibold tracking-widest uppercase text-yellow-DEFAULT mb-4">Blog</span>
          <h1 className="font-display text-4xl md:text-5xl text-white tracking-wide leading-tight mb-6">{post.titulo}</h1>
          {post.resumen && (
            <p className="text-gray-soft text-lg leading-relaxed mb-6">{post.resumen}</p>
          )}
          <div className="flex items-center gap-3 text-sm text-gray-mid">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "rgba(124,58,237,0.4)" }}
            >
              {post.autor[0]}
            </div>
            <span className="text-gray-soft font-medium">{post.autor}</span>
            <span>·</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </section>

      {/* Imagen destacada */}
      <div className="max-w-5xl mx-auto px-6 -mt-0 pt-10">
        <div
          className="w-full rounded-2xl overflow-hidden flex items-center justify-center mb-10"
          style={{
            height: "300px",
            background: "linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(21,10,53,0.8) 100%)",
            border: "1px solid rgba(124,58,237,0.15)",
          }}
        >
          <span className="text-7xl">✍️</span>
        </div>
      </div>

      {/* Contenido + Sidebar */}
      <div className="max-w-5xl mx-auto px-6 pb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Artículo */}
          <article className="flex-1 min-w-0">
            <div
              className="prose prose-invert max-w-none text-gray-soft leading-relaxed"
              style={{ fontSize: "16px", lineHeight: "1.8" }}
            >
              {post.contenido.split("\n").map((paragraph, i) =>
                paragraph.trim() ? (
                  <p key={i} className="mb-4 text-gray-soft">{paragraph}</p>
                ) : (
                  <br key={i} />
                )
              )}
            </div>

            {/* Volver */}
            <div className="mt-12 pt-8" style={{ borderTop: "1px solid rgba(124,58,237,0.15)" }}>
              <Link
                href="/blog"
                className="text-sm text-yellow-DEFAULT hover:text-white transition-colors font-semibold"
              >
                ← Volver al Blog
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="w-full lg:w-[280px] flex-shrink-0 flex flex-col gap-8">
            <SponsorSidebar label="A" />

            {related.length > 0 && (
              <div>
                <p className="text-[10px] text-gray-dark uppercase tracking-widest mb-3">Más artículos</p>
                <div className="flex flex-col gap-4">
                  {related.map(p => (
                    <Link key={p.id} href={`/blog/${p.slug}`} className="group">
                      <div
                        className="rounded-lg p-3 transition-all hover:border-yellow-border"
                        style={{ background: "rgba(21,10,53,0.5)", border: "1px solid rgba(124,58,237,0.12)" }}
                      >
                        <p className="text-white text-sm font-medium group-hover:text-yellow-DEFAULT transition-colors line-clamp-2">{p.titulo}</p>
                        <p className="text-gray-mid text-xs mt-1">{formatDate(p.createdAt)}</p>
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

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="py-16 px-6 bg-space-black">
          <div className="max-w-5xl mx-auto">
            <h3 className="font-display text-3xl text-white tracking-wide mb-8">Más del Blog</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map(p => <BlogCardGrid key={p.id} post={p} />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
