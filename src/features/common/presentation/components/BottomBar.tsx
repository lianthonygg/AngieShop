"use client";

import { CircleUserIcon, ShoppingBagIcon, StoreIcon } from "lucide-react";
import BarItem from "./BarItem";
import { usePathname } from "next/navigation";

function BottomBar() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex justify-between items-center px-2 h-16 bg-pink-100 shadow-top z-10">
      <BarItem title="Tienda" icon={StoreIcon} tag="" pathname={pathname} />
      <BarItem
        title="Carrito"
        icon={ShoppingBagIcon}
        tag="cart"
        pathname={pathname}
      />
      <BarItem
        title="Perfil"
        icon={CircleUserIcon}
        tag="profile"
        pathname={pathname}
      />
    </footer>
  );
}

export default BottomBar;
