type InstagramMedia = {
  id: string;
  caption: string | null;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
};

const IG_URL = "https://www.instagram.com/radioeclipsefm";

export function InstagramFeed({ media }: { media: InstagramMedia[] }) {
  if (media.length === 0) {
    return (
      <a
        href={IG_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col items-center justify-center gap-4 py-16 px-6 bg-space-card border border-purple-border rounded-2xl hover:border-yellow-border transition-all duration-300 text-center"
      >
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
          style={{ background: "linear-gradient(135deg,#833AB4,#E1306C,#F77737)" }}>
          📷
        </div>
        <div>
          <p className="text-white font-display text-xl tracking-wide">Síguenos en Instagram</p>
          <p className="text-gray-mid text-sm mt-1">@radioeclipsefm</p>
        </div>
        <span className="text-xs text-yellow-DEFAULT font-semibold group-hover:translate-x-1 inline-block transition-transform">
          Ver perfil →
        </span>
      </a>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {media.slice(0, 6).map((post) => {
        const imgSrc = post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;
        return (
          <a
            key={post.id}
            href={post.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative aspect-square rounded-xl overflow-hidden bg-space-card border border-purple-border hover:border-yellow-border transition-all duration-300"
          >
            {imgSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imgSrc}
                alt={post.caption?.slice(0, 80) ?? "Publicación de Instagram"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-semibold transition-opacity">
                Ver en Instagram →
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
