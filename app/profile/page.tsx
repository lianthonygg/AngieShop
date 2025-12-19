"use client";
import BottomBar from "@/src/presentation/common/components/BottomBar";
import { PageTransition } from "@/src/presentation/common/components/PageTransition";

function ProfilePage() {
  return (
    <div className="w-full min-h-screen bg-gray-300">
      <PageTransition />

      <div className="w-4/5 h-screen mx-auto bg-purple-900 flex flex-col justify-center items-center">
        <div>
          <div className="w-10 h-10 p-10 bg-red-500 rounded-full flex justify-center items-center">
            img
          </div>
          <div>Nombre</div>
          <div>Correo</div>
        </div>
        <div>
          <button>Editar</button>
          <button>Cerrar sesión</button>
        </div>
        <div>Profile Links</div>
        <div>Informacion Personal</div>
      </div>
      <BottomBar />
    </div>
  );
}

export default ProfilePage;
