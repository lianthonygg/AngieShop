interface HeaderProps {
  cartCount: number;
}

const Header = ({ cartCount }: HeaderProps) => {
  return (
    <header className="py-4 px-2 flex justify-start items-center gap-4 font-bold sticky top-0 bg-white z-40 shadow-lg">
      <h1 className="font-raleway pl-2 text-xl">Carrito</h1>
      <div className="w-8 h-8 rounded-full bg-blue-100 shadow-xs flex justify-center items-center">
        {cartCount}
      </div>
    </header>
  );
};

export default Header;
