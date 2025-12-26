interface AvatarProps {
  avatarUrl: string;
  fullName: string;
}

const Avatar = ({ avatarUrl, fullName }: AvatarProps) => {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative">
        <img
          src={avatarUrl}
          alt="Foto de perfil"
          className="w-28 h-28 rounded-full object-cover border-4 border-indigo-200 shadow-2xl ring-4 ring-white/50"
        />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-gray-900 text-center">
        {fullName}
      </h2>
    </div>
  );
};

export default Avatar;
