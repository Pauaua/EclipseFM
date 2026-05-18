import { auth } from "@/lib/auth";
import { getPosts } from "@/lib/actions/posts.actions";
import { ContentManager } from "@/components/content/ContentManager";
import { createPost, updatePost, deletePost, togglePostPublicado } from "@/lib/actions/posts.actions";

export default async function DashboardBlogPage() {
  const session = await auth();
  const posts = await getPosts();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Blog</h1>
        <p className="text-[#7B6FA0] text-sm mt-0.5">Artículos del blog de Eclipse FM</p>
      </div>
      <ContentManager
        items={posts}
        tipo="blog"
        onCreate={createPost}
        onUpdate={updatePost}
        onDelete={deletePost}
        onToggle={togglePostPublicado}
        autorDefault={`${session?.user.nombre} ${session?.user.apellido}`}
      />
    </div>
  );
}
