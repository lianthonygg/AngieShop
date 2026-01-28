"use client";
import { Calendar, Mail } from "lucide-react";
import Avatar from "../components/Avatar";
import Stat from "../components/Stat";
import LogoutButton from "../components/LogoutButton";

interface UserData {
  name: string;
  email: string;
  image: string;
  createdAt: string;
}

const ProfileView = ({ data }: { data: UserData }) => {
  const { name, email, image, createdAt } = data ?? {};

  const formattedDate = new Date(createdAt ?? "").toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="w-full max-w-4xl">
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-8 md:p-10">
        <Avatar avatarUrl={image ?? ""} fullName={name ?? ""} />

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

          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
