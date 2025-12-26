import { Sparkles } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="text-center mb-6">
      <h2 className="text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
        Mi Perfil
      </h2>
      <div className="flex text-lg md:text-2xl text-gray-700 font-medium">
        Gestiona tu cuenta de
        <span className="font-bold ml-2 text-purple-700">Angie Shop</span>
        <div className="flex justify-center ml-2">
          <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" />
        </div>
      </div>
    </header>
  );
};

export default Header;
