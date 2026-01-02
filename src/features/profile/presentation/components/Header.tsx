import { Sparkles } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="text-center mb-6">
      <h2 className="text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
        Mi Perfil
      </h2>

      <p className="text-lg md:text-2xl text-gray-700 font-medium">
        Gestiona tu cuenta de{" "}
        <span className="inline-flex items-center gap-1 font-bold text-purple-700 whitespace-nowrap">
          Angie Shop
          <Sparkles className="w-6 h-6 text-pink-500 animate-pulse" />
        </span>
      </p>
    </header>
  );
};

export default Header;
