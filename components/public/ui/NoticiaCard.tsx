import Link from "next/link";

type Noticia = {
  id: string; titulo: string; slug: string; resumen: string | null;
  autor: string; createdAt: Date; imagen: string | null;
};

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("es-CL", { day: "numeric", month: "long", year: "numeric" });
}

export function NoticiaCardFeatured({ noticia }: { noticia: Noticia }) {
  return (
    <Link href={`/noticias/${noticia.slug}`}>
      <div className="group bg-space-card border-l-4 border-yellow-DEFAULT rounded-2xl overflow-hidden hover:shadow-yellow transition-all duration-300">
        <div className="h-40 sm:h-52 md:h-[280px] bg-gradient-to-br from-blue-900 to-space-purple flex items-center justify-center">
          <span className="text-5xl md:text-6xl">📰</span>
        </div>
        <div className="p-4 sm:p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-yellow-DEFAULT">Destacado</span>
            <span className="text-xs text-gray-mid">{formatDate(noticia.createdAt)}</span>
          </div>
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-white tracking-wide mb-3 group-hover:text-yellow-DEFAULT transition-colors">
            {noticia.titulo}
          </h2>
          {noticia.resumen && <p className="text-gray-soft text-sm leading-relaxed line-clamp-2">{noticia.resumen}</p>}
        </div>
      </div>
    </Link>
  );
}

export function NoticiaCardGrid({ noticia }: { noticia: Noticia }) {
  return (
    <Link href={`/noticias/${noticia.slug}`}>
      <div className="group bg-space-card border-l-2 border-purple-DEFAULT rounded-xl overflow-hidden hover:border-l-4 hover:-translate-y-0.5 transition-all duration-300">
        <div className="h-32 sm:h-40 bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center">
          <span className="text-3xl">📰</span>
        </div>
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-white text-sm mb-1 group-hover:text-yellow-DEFAULT transition-colors line-clamp-2">
            {noticia.titulo}
          </h3>
          {noticia.resumen && <p className="text-gray-soft text-xs line-clamp-2 mb-2">{noticia.resumen}</p>}
          <p className="text-xs text-gray-mid">{formatDate(noticia.createdAt)}</p>
        </div>
      </div>
    </Link>
  );
}

export function NoticiaCardCompact({ noticia }: { noticia: Noticia }) {
  return (
    <Link href={`/noticias/${noticia.slug}`} className="group flex gap-3 items-start hover:bg-space-purple/30 p-2 rounded-lg transition-colors">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-blue-900 flex items-center justify-center flex-shrink-0 text-xl">📰</div>
      <div>
        <p className="text-sm text-white font-medium group-hover:text-yellow-DEFAULT transition-colors line-clamp-2">{noticia.titulo}</p>
        <p className="text-xs text-gray-mid mt-0.5">{formatDate(noticia.createdAt)}</p>
      </div>
    </Link>
  );
}
