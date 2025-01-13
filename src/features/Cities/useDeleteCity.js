import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCityApi } from "../../services/apiData";
import { useUser } from "../user/useUser";
import toast from "react-hot-toast";

export function useDeleteCity() {
  const queryClient = useQueryClient();
  const { user, isLoading: isLoadingUser } = useUser();

  const { mutate: deleteCity, isLoading: isRemoving } = useMutation({
    mutationFn: async (cityId) => {
      if (!user?.uid || !cityId) {
        throw new Error("User or City ID is missing");
      }
      return deleteCityApi({ uid: user.uid, cityId: cityId });
    },
    onSuccess: (_, cityId) => {
      queryClient.setQueryData(["cities", user?.uid], (oldData) =>
        oldData?.filter((city) => city.id !== cityId)
      );

      queryClient.invalidateQueries({
        queryKey: ["cities", user?.uid, cityId],
        exact: true,
      });

      toast.success("City removed successfully");
    },
    onError: (error) => toast.error(error.message || "Failed to remove city"),
  });

  return { deleteCity, isDeleting: isLoadingUser || isRemoving };
}
