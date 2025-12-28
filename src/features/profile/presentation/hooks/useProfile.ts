import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/features/common/presentation/providers/supabase-provider";
import { useGetProfile } from "../../interceptors/use-get-profile";

export const useProfile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();

  const { data, error, isLoading, refetch } = useGetProfile();

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };
    init();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setIsAuthenticated(!!session);

        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          await refetch();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router, refetch]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return {
    isAuthenticated: !!isAuthenticated,
    data: isAuthenticated ? data : null,
    error,
    isLoading: isLoading || isAuthenticated === null,
    handleLogout,
    refetch,
  };
};
