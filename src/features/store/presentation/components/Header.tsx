import { Search } from "lucide-react";
import React from "react";
import { poppins, raleway } from "../hooks/useFonts";

const Header = () => {
  return (
    <header className="py-4 px-2 flex md:justify-around items-center gap-4 font-bold sticky top-0 bg-white z-40 shadow-lg">
      <div className="flex items-center flex-1 gap-2">
        <img
          src="/logo.png"
          alt="Logo Angie Shop"
          className="w-10 h-10 object-contain"
        />
        <span className={`${raleway.className} text-xl`}>Angie Shop</span>
      </div>
      <input
        type="text"
        className={`${poppins.className} hidden md:block px-3 py-1 text-black placeholder:text-black border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary flex-shrink-0`}
        placeholder="Buscar"
      />

      <button
        type="button"
        className="md:hidden bg-white text-white px-4 py-2 rounded-xl flex items-center justify-center"
        aria-label="Buscar"
        // onClick={() => }
      >
        <Search size={25} strokeWidth={2} color="#000" />
      </button>
    </header>
  );
};

export default Header;
