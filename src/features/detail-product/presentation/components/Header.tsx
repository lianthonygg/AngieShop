"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const Header = () => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="relative flex items-center justify-center py-4">
        <button
          onClick={onBack}
          className="absolute left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Atrás"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-lg font-medium">Detalles del producto</h1>
      </div>
    </div>
  );
};

export default Header;
