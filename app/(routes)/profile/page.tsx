import { authOptions } from "@/src/features/common/lib/auth-options";
import Header from "@/src/features/profile/presentation/components/Header";
import SignInWithGoogleSection from "@/src/features/profile/presentation/components/SignInWithGoogleSection";
import ProfileView from "@/src/features/profile/presentation/views/profile_view";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Perfil | Angie Shop",
  description: "Perfil en Angie Shop",
};

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (session == null) {
    return <SignInWithGoogleSection />;
  }

  const userData = {
    name: session.user.name ?? "",
    email: session.user.email ?? "",
    image: session.user.image ?? "",
    createdAt: session.user.createdAt ?? "",
  };

  return <ProfileView data={userData} />;
}
