import { useQuery } from "@tanstack/react-query";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import { getCityDetailsApi } from "../../services/apiData";

export function useGetCityDetails() {
  const [lat, lng] = useUrlPosition();

  const {
    data = {},
    error,
    isLoading,
  } = useQuery({
    queryKey: ["cityDetails", lat, lng],
    queryFn: () => getCityDetailsApi({ lat, lng }),
    enabled: !!lat && !!lng,
    retry: false,
  });

  return {
    cityName: data?.cityName,
    country: data?.country,
    emoji: data?.emoji,
    lat,
    lng,
    error,
    isLoading,
  };
}
