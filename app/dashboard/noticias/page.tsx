import { auth } from "@/lib/auth";
import { getNoticias } from "@/lib/actions/noticias.actions";
import { ContentManager } from "@/components/content/ContentManager";
import { createNoticia, updateNoticia, deleteNoticia, toggleNoticiaPublicado } from "@/lib/actions/noticias.actions";

export default async function DashboardNoticiasPage() {
  const session = await auth();
  const noticias = await getNoticias();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Noticias</h1>
        <p className="text-[#7B6FA0] text-sm mt-0.5">Noticias publicadas en la web de Eclipse FM</p>
      </div>
      <ContentManager
        items={noticias}
        tipo="noticias"
        onCreate={createNoticia}
        onUpdate={updateNoticia}
        onDelete={deleteNoticia}
        onToggle={toggleNoticiaPublicado}
        autorDefault={`${session?.user.nombre} ${session?.user.apellido}`}
      />
    </div>
  );
}
