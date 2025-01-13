import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCityApi } from "../../services/apiData";
import { useUser } from "../user/useUser";
import toast from "react-hot-toast";

export function useAddCity() {
  const queryClient = useQueryClient();

  const { user, isLoading: isLoadingUser } = useUser();

  const { mutate: addCity, isLoadingAdd } = useMutation({
    mutationFn: async (city) => {
      if (!user?.uid) {
        throw new Error("User or City ID is missing");
      }
      return addCityApi({ uid: user.uid, city });
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["cities", user?.uid, data.id], data);

      toast.success("City added successfully");
    },
    onError: (error) => toast.error(error.message || "An error occurred"),
  });

  return { addCity, isLoading: isLoadingUser || isLoadingAdd };
}
