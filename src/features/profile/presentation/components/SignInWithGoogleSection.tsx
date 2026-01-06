"use client";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";

const SignInWithGoogleSection = () => {
  return (
    <div>
      <div className="mb-12 max-w-sm md:max-w-md">
        <Image
          src="https://thumbs.dreamstime.com/b/vector-pop-art-illustration-young-sexy-happy-girl-jeans-t-shirt-holding-shopping-bags-woman-showing-her-purchases-back-183732380.jpg"
          alt="Chica feliz comprando en Angie Shop"
          width={500}
          height={500}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD..."
          className="w-full h-auto rounded-3xl shadow-2xl border-8 border-white/70"
        />
      </div>
      <div className="text-center mb-10 max-w-lg">
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
          Inicia sesión con Google para ver tu perfil, carrito personalizado,
          historial de compras y ofertas exclusivas ✨
        </p>
      </div>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="group relative w-full max-w-md bg-white text-gray-900 font-bold text-lg py-5 px-10 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-500 ease-out border-2 border-purple-200 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center justify-center space-x-4">
          <FaGoogle className="w-4 h-4" />
          <span className="group-hover:text-white text-sm transition-colors duration-300">
            Iniciar Sesión con Google
          </span>
          <ShoppingBag className="w-4 h-4 text-purple-600 group-hover:text-white transition-colors duration-300" />
        </div>
      </button>
    </div>
  );
};

export default SignInWithGoogleSection;
