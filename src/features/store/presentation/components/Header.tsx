import { Search } from "lucide-react";
import Image from "next/image";

const Header = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <header className="px-2 flex md:justify-around items-center justify-between gap-4 font-bold sticky top-0 bg-white z-40 shadow-lg">
      <div className="relative w-16 h-16 flex items-center gap-2">
        <Image
          src="/logo.avif"
          alt="Logo Angie Shop"
          fill
          className="object-contain"
        />
      </div>
      <span className={`font-raleway text-xl`}>Angie Shop</span>
      {/* <input
        type="text"
        className={`font-poppins hidden md:block px-3 py-1 text-black placeholder:text-black border rounded-xl focus:outline-none focus:ring-1 focus:ring-primary flex-shrink-0`}
        placeholder="Buscar"
      /> */}

      <button
        type="button"
        className="bg-white text-white px-4 py-2 rounded-xl flex items-center justify-center"
        aria-label="Buscar"
        onClick={() => onToggle()}
      >
        <Search size={25} strokeWidth={2} color="#000" />
      </button>
    </header>
  );
};

export default Header;
