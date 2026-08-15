const FB_PAGE_URL = "https://www.facebook.com/RadioEclip5e";

export function FacebookPagePlugin() {
  const src = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    FB_PAGE_URL
  )}&tabs=timeline&width=500&height=560&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`;

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[500px] rounded-2xl overflow-hidden border border-purple-border bg-space-card">
        <iframe
          src={src}
          width="100%"
          height="560"
          style={{ border: "none", overflow: "hidden", display: "block" }}
          scrolling="no"
          frameBorder="0"
          allow="encrypted-media"
          title="Página de Facebook de Radio Eclipse FM"
        />
      </div>
    </div>
  );
}
