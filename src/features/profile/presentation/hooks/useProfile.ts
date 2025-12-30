import { signOut, useSession } from "next-auth/react";

export const useProfile = () => {
  const { data: session, status } = useSession();

  return {
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
    error: null,
    data: session?.user ?? null,
    handleLogout: () => signOut(),
  };
};
