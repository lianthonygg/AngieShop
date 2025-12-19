import React from "react";
import BarItem from "./BarItem";
import { AlignJustify } from "lucide-react";
import {
  BuildingStorefrontIcon,
  CubeIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

function BottomBar() {
  const pathname = usePathname();

  return (
    <footer className="fixed bottom-0 left-0 right-0 flex justify-between px-2 items-center w-full h-16 bg-white/95 shadow-top">
      <BarItem
        title="Tienda"
        icon={"/Shop.svg"}
        tag="store"
        pathname={pathname}
      />
      <BarItem
        title="Categorias"
        icon={"/Categories.svg"}
        tag="categories"
        pathname={pathname}
      />
      <BarItem
        title="Favoritos"
        icon={"/WishList.svg"}
        tag="favorites"
        pathname={pathname}
      />
      <BarItem
        title="Carrito"
        icon={"Cart.svg"}
        tag="cart"
        pathname={pathname}
      />
      <BarItem
        title="Perfil"
        icon={"/Profile.svg"}
        tag="profile"
        pathname={pathname}
      />
    </footer>
  );
}

export default BottomBar;
