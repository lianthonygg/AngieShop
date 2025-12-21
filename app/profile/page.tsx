"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Shield,
  LogOut,
  ShoppingCart,
  Package,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import BottomBar from "@/src/presentation/common/components/BottomBar";
import { supabase } from "@/src/providers/supabase-provider";
import { FaGoogle } from "react-icons/fa"
import { signInWithGoogle } from "@/src/data/login/google";

interface ProfileData {
  id: string;
  email: string;
  user_metadata: {
    avatar_url?: string;
    name?: string;
    picture?: string;
    full_name?: string;
    email_verified?: boolean;
  };
  created_at: string;
  updated_at: string;
  app_metadata?: {
    provider: string;
    providers: string[];
  };
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAutenticated, setIsAutenticated] = useState(true);
  const router = useRouter();

  const fetchProfile = async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!error && user) {
      setProfile(user as ProfileData);
    } else {
      setIsAutenticated(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          setIsAutenticated(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAutenticated(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const { user_metadata, app_metadata, created_at, email } = profile ?? {};
  const isGoogleUser = app_metadata?.providers?.includes("google");
  const picture =
    user_metadata?.picture ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user_metadata?.full_name || "User"
    )}&background=6366f1&color=fff&bold=true&size=128`;

  const formattedDate = new Date(created_at ?? "").toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-300/20 via-transparent to-pink-300/20" />
      <div className="relative z-1 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Mi Perfil
          </h1>
          <div className="flex text-lg md:text-2xl text-gray-700 font-medium">
            Gestiona tu cuenta de
            <span className="font-bold ml-2 text-purple-700">Angie Shop</span>
            <div className="flex justify-center ml-2">
              <Sparkles className="w-8 h-8 text-pink-500 animate-pulse" />
            </div>
          </div>
        </div>

        {isAutenticated ? (
          <div>
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10">
              {/* Avatar */}
              <div className="flex flex-col items-center mb-8">
                <div className="relative">
                  <img
                    src={user_metadata?.avatar_url ?? picture}
                    alt="Foto de perfil"
                    className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200 shadow-2xl ring-4 ring-white/50"
                  />
                  {isGoogleUser && (
                    <div className="absolute -bottom-2 -right-2 bg-red-500 p-2 rounded-full shadow-lg">
                      <Globe className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <h2 className="mt-6 text-2xl font-bold text-gray-900 text-center">
                  {user_metadata?.full_name || "Usuario"}{" "}
                </h2>
              </div>

              {/* Datos principales */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl">
                  <div className="py-3 px-2 bg-indigo-100 rounded-2xl">
                    <Mail className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email</p>
                    <p className="text-sm font-medium text-gray-900">{email}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl">
                  <div className="p-3 bg-green-100 rounded-2xl">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Miembro desde
                    </p>
                    <p className="text-md font-semibold text-gray-900">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full bg-gradient-to-r from-rose-500 to-pink-600 text-white py-4 px-6 rounded-2xl font-semibold shadow-xl hover:from-rose-600 hover:to-pink-700 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-12 max-w-sm md:max-w-md">
              <img
                src="https://thumbs.dreamstime.com/b/vector-pop-art-illustration-young-sexy-happy-girl-jeans-t-shirt-holding-shopping-bags-woman-showing-her-purchases-back-183732380.jpg"
                alt="Chica feliz comprando en Angie Shop"
                className="w-full h-auto rounded-3xl shadow-2xl border-8 border-white/70"
              />
            </div>
            <div className="text-center mb-10 max-w-lg">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Inicia sesión con Google para ver tu perfil, carrito
                personalizado, historial de compras y ofertas exclusivas ✨
              </p>
            </div>
            <button
              onClick={() => signInWithGoogle()}
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
        )}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Angie Shop • Compras felices y seguras 💜
          </p>
        </div>
      </div>

      <BottomBar />
    </div>
  );
}
