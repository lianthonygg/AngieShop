import Image from "next/image";
import { Nunito_Sans, Raleway } from "next/font/google";
import { useRouter } from "next/navigation";
import { PageTransition } from "./PageTransition";

const raleway = Raleway({
  variable: "--font-gest-raleway",
  weight: "800",
  subsets: ["latin"],
});

const nunito = Nunito_Sans({
  variable: "--font-gest-sans",
  weight: "200",
  subsets: ["latin"],
});

function GetStarted() {
  const router = useRouter();

  const navigateTo = (url: string) => {
    router.push(url);
  };

  return (
    <div className="w-full h-screen p-3 flex flex-col justify-around items-center">
      <PageTransition />
      <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
        <div className="w-32 h-32 rounded-full bg-white shadow-xl shadow-gray-200 flex justify-center items-center">
          <Image src={"/prueba.png"} alt="Logo" width={80} height={80} />
        </div>
        <h1 className={`${raleway.className} text-3xl text-[#202020]`}>
          EnviosYa
        </h1>
        <h4 className={`${nunito.className} text-[16px] text-[#202020]`}>
          Description
        </h4>
      </div>
      <div className="w-full bottom-0 flex flex-col justify-center items-center">
        <button
          onClick={() => navigateTo("/register")}
          className={`w-full bg-[#004CFF] ${nunito.className} text-[#F3F3F3] flex justify-center items-center py-3.5 rounded-[16px] text-[18px]`}
        >
          <span>Let's get started</span>
        </button>
        <div className="flex justify-center items-center gap-4 pt-2 pb-20">
          <h4 className={`${nunito.className} text-xs text-[#202020]`}>
            I already have an account
          </h4>
          <button
            onClick={() => navigateTo("/login")}
            className="w-8 h-8 rounded-full bg-blue-600 shadow-xs flex justify-center items-center"
          >
            <Image src={"/Arrow.png"} alt="Arrow" width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetStarted;
