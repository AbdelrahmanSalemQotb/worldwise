import { useQuery } from "@tanstack/react-query";
import { getCitiesApi } from "../../services/apiData";
import { useUser } from "../user/useUser";

export function useCities() {
  const { isAuthenticated, user, isLoading: isLoadingUser } = useUser();

  const { data: cities, isLoading: isLoadingCities } = useQuery({
    queryKey: ["cities", user?.uid],
    queryFn: () => getCitiesApi(user?.uid),
    enabled: isAuthenticated && !isLoadingUser && !!user?.uid,
  });

  return { cities, isLoading: isLoadingCities || isLoadingUser };
}
