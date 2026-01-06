"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <button
      onClick={() => signOut()}
      className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-xl hover:from-rose-600 hover:to-pink-700 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3"
    >
      <LogOut className="w-5 h-5" />
      <span>Cerrar Sesión</span>
    </button>
  );
};

export default LogoutButton;
