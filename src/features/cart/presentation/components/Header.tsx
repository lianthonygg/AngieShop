interface HeaderProps {
  cartCount: number;
}

const Header = ({ cartCount }: HeaderProps) => {
  return (
    <header className="py-4 px-2 flex justify-start items-center gap-4 font-bold sticky top-0 bg-gradient-to-b from-[var(--angie-pink-start)] to-[var(--angie-soft-start)] z-40 shadow-lg">
      <h1 className="font-raleway pl-2 text-xl">Carrito</h1>
      <div className="w-8 h-8 rounded-full bg-angie-light-pink shadow-xs flex justify-center items-center">
        {cartCount}
      </div>
    </header>
  );
};

export default Header;
