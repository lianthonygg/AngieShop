"use client";
import BottomBar from "@/src/features/common/presentation/components/BottomBar";
import CartItem from "@/src/features/cart/presentation/components/CartItem";

type Cart = {
  items: CartItem[];
};

type CartItem = {
  id: string;
  quantity: number;
  product: Product;
};

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
};

function CartPage() {
  // const router = useRouter();

  // const [data, setData] = useState<Cart>();
  // const [cartCount, setCartCount] = useState(0);

  // const userCart = async () => {
  //   try {
  //     const {
  //       data: { user },
  //       error,
  //     } = await supabase.auth.getUser();
  //     if (!error && user) {
  //       if (user.id) {
  //         const { data: cart } = await supabase
  //           .from("carts")
  //           .select("id")
  //           .eq("user_id", user.id)
  //           .single();

  //         if (cart) {
  //           const { data: items } = await supabase
  //             .from("cart_item")
  //             .select("*")
  //             .eq("cart_id", cart.id);
  //           console.log(items);

  //           const totalItems =
  //             items?.reduce((sum, item) => sum + (item as any).quantity, 0) ||
  //             0;
  //           setCartCount(totalItems);
  //         }
  //       }
  //     } else {
  //       //setIsAutenticated(false);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const navigateTo = (url: string) => {
  //   router.push(url);
  // };

  // useEffect(() => {
  //   userCart();
  // }, []);

  return (
    <div className="w-full min-h-screen">
      {/* <header className="py-4 px-2 flex justify-start items-center gap-4 font-bold sticky top-0 bg-white z-40 shadow-lg">
        <span className={`${raleway.className} pl-2 text-xl`}>Cart</span>
        <div className="w-8 h-8 rounded-full bg-blue-100 shadow-xs flex justify-center items-center">
          {cartCount}
        </div>
      </header>
      <section className="px-2 pt-4  flex flex-col items-center">
        {data && data?.items.length > 0 ? (
          data.items.map((item) => (
            <div key={item.id}>
              <CartItem
                key={item.product.id}
                id={item.product.id}
                title={item.product.name}
                price={item.product.price}
              />
            </div>
          ))
        ) : (
          <div className="w-32 h-32 rounded-full bg-white shadow-xl shadow-gray-200 flex justify-center items-center">
            <Image
              src={"/CartEmpty.png"}
              alt="No hay productos en tu carrito"
              width={80}
              height={80}
            />
          </div>
        )}
      </section> */}
      <BottomBar />
    </div>
  );
}

export default CartPage;
