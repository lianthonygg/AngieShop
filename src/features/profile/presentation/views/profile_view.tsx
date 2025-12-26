"use client";
import { Calendar, Mail } from "lucide-react";
import Avatar from "../components/Avatar";
import Header from "../components/Header";
import Stat from "../components/Stat";
import LogoutButton from "../components/LogoutButton";
import SignInWithGoogleSection from "../components/SignInWithGoogleSection";
import Footer from "../components/Footer";
import BottomBar from "@/src/features/common/presentation/components/BottomBar";
import { useProfile } from "../hooks/useProfile";
import Loading from "../components/Loading";

const ProfileView = () => {
  const { isAuthenticated, data, error, handleLogout, isLoading } =
    useProfile();

  const { user_metadata, app_metadata, created_at, email } = data ?? {};

  const formattedDate = new Date(created_at ?? "").toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-purple-300/20 via-transparent to-pink-300/20" />
      <div className="relative z-1 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <Header />

        {isAuthenticated ? (
          <div>
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10">
              <Avatar
                avatarUrl={user_metadata?.avatar_url ?? ""}
                fullName={user_metadata?.full_name ?? ""}
              />

              <div className="space-y-6">
                <Stat
                  className="from-indigo-50 to-purple-50"
                  icon={<Mail className="w-6 h-6 text-indigo-600" />}
                  label="Email"
                  value={email ?? ""}
                />
                <Stat
                  className="from-green-50 to-blue-50"
                  icon={<Calendar className="w-6 h-6 text-green-600" />}
                  label="Miembro desde"
                  value={formattedDate}
                />

                <LogoutButton onLogout={handleLogout} />
              </div>
            </div>
          </div>
        ) : (
          <SignInWithGoogleSection />
        )}

        <Footer />
      </div>

      <BottomBar />
    </div>
  );
};

export default ProfileView;
