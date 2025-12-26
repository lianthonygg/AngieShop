import { useEffect, useState } from "react";
import { ProfileResponse } from "../../domain/types/profile";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/providers/supabase-provider";
import { useGetProfile } from "../../interceptors/use-get-profile";

export const useProfile = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [canFetchProfile, setCanFetchProfile] = useState(false);
  const router = useRouter();

  const { data, error, isLoading, isFetching, refetch } =
    useGetProfile(canFetchProfile);

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setIsAuthenticated(true);
        setCanFetchProfile(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          setIsAuthenticated(false);
          setCanFetchProfile(false);
        }
        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          setIsAuthenticated(true);
          setCanFetchProfile(true);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
  };

  return {
    //values
    isAuthenticated,
    data,
    error,
    isLoading,
    isFetching,

    //methods
    refetch,
    handleLogout,
  };
};
