import { getUsers } from "@/lib/actions/users.actions";
import { UsuariosClient } from "./UsuariosClient";

export default async function UsuariosPage() {
  const users = await getUsers();
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Usuarios</h1>
          <p className="text-[#7B6FA0] text-sm mt-0.5">Gestión del equipo de Eclipse FM</p>
        </div>
      </div>
      <UsuariosClient initialUsers={users} />
    </div>
  );
}
