import { useParams } from "react-router-dom";
import { useUser } from "../user/useUser";
import { useQuery } from "@tanstack/react-query";
import { getCityApi } from "../../services/apiData";

export function useCity() {
  const { user, isAuthenticated, isLoading: isLoadingUser } = useUser();

  const { id } = useParams();

  const {
    isLoading: isLoadingCity,
    data: city,
    error,
  } = useQuery({
    queryKey: ["city", user?.uid, id],
    queryFn: () => {
      if (!user?.uid || !id) {
        throw new Error("User or City ID is missing");
      }
      return getCityApi({ uid: user.uid, cityId: id });
    },
    enabled: isAuthenticated && !isLoadingUser && !!user?.uid,
  });

  return { city, isLoading: isLoadingCity || isLoadingUser, error };
}
