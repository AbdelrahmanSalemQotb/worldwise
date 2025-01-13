import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebase";

export function useUser() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        queryClient.setQueryData(["user"], user);
      } else {
        queryClient.setQueryData(["user"], null);
      }
    });

    return () => unsubscribe();
  }, [queryClient]);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: Infinity,
  });

  return {
    user,
    isLoading: isLoading,
    isAuthenticated: !!user,
  };
}
