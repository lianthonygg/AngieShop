import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

type CartItemProps = {
  id: string;
  title: string;
  price: number;
};

function CartItem({ id, title, price }: CartItemProps) {
  const router = useRouter();

  const deleteCartItem = async (id: string) => {
    try {
      // const { data } = await axios.delete(`/cart/${id}`, {
      //   withCredentials: true,
      // });
      // console.log(data);
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const status = err.response.status;

        if (status === 401) {
          navigateTo("/login");
        }
      }
    }
  };

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <section className="relative border border-gray-200 rounded-xl flex items-center overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="w-36 min-h-28 h-full bg-gray-200 " />
      {/* <div className="w-fit">
        <Image src={src} alt={alt} width={150} height={150} />
      </div> */}

      <div className="p-4">
        <h3 className="mb-2 text-gray-800">{title}</h3>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>

      <div
        onClick={() => deleteCartItem(id)}
        className="absolute bottom-2 left-2"
      >
        <Image src="/Remove.svg" alt="trash" width={40} height={40} />
      </div>
    </section>
  );
}

export default CartItem;
