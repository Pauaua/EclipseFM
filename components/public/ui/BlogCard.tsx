import Link from "next/link";

type Post = {
  id: string; titulo: string; slug: string; resumen: string | null;
  autor: string; createdAt: Date; imagen: string | null;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
}

export function BlogCardFeatured({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="group flex flex-col md:flex-row gap-0 bg-space-card border border-yellow-border rounded-2xl overflow-hidden hover:shadow-yellow transition-all duration-300">
        <div className="w-full md:w-[300px] md:min-w-[260px] lg:min-w-[300px] h-44 md:h-auto bg-gradient-to-br from-purple-900 to-space-purple flex items-center justify-center">
          <span className="text-5xl">✍️</span>
        </div>
        <div className="p-5 md:p-6 flex flex-col justify-center">
          <span className="text-[10px] font-semibold tracking-widest uppercase text-yellow-DEFAULT mb-2">Blog</span>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-white tracking-wide mb-3 group-hover:text-yellow-DEFAULT transition-colors">
            {post.titulo}
          </h2>
          {post.resumen && <p className="text-gray-soft text-sm leading-relaxed mb-4 line-clamp-3">{post.resumen}</p>}
          <div className="flex items-center gap-3 text-xs text-gray-mid">
            <div className="w-7 h-7 rounded-full bg-purple-DEFAULT flex items-center justify-center text-white font-bold text-xs">
              {post.autor[0]}
            </div>
            <span>{post.autor}</span>
            <span>·</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
          <span className="mt-4 text-xs text-yellow-DEFAULT font-semibold group-hover:translate-x-1 inline-block transition-transform">
            Leer más →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogCardGrid({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <div className="group bg-space-card border border-purple-border rounded-2xl overflow-hidden hover:-translate-y-1 hover:border-yellow-border transition-all duration-300">
        <div className="h-32 sm:h-44 bg-gradient-to-br from-purple-900 to-eclipse-indigo flex items-center justify-center">
          <span className="text-4xl">✍️</span>
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="font-display text-base sm:text-lg md:text-xl text-white tracking-wide mb-2 group-hover:text-yellow-DEFAULT transition-colors line-clamp-2">
            {post.titulo}
          </h3>
          {post.resumen && <p className="text-gray-soft text-xs sm:text-sm line-clamp-2 mb-3">{post.resumen}</p>}
          <div className="flex items-center gap-2 text-xs text-gray-mid pt-3 border-t border-purple-border">
            <span>{post.autor}</span>
            <span>·</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BlogCardCompact({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex gap-3 items-start hover:bg-space-purple/30 p-2 rounded-lg transition-colors">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-purple-900 flex items-center justify-center flex-shrink-0 text-xl">✍️</div>
      <div>
        <p className="text-sm text-white font-medium group-hover:text-yellow-DEFAULT transition-colors line-clamp-2">{post.titulo}</p>
        <p className="text-xs text-gray-mid mt-0.5">{formatDate(post.createdAt)}</p>
      </div>
    </Link>
  );
}
