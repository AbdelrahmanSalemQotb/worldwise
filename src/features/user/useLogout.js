import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiLogout } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: logout, isLoading } = useMutation({
    mutationFn: apiLogout,
    onSuccess: () => {
      queryClient.removeQueries();
      queryClient.setQueryData(["user"], null);
      toast.error("Logout successful");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.message || "Logout failed. Please try again.");
    },
  });

  return { logout, isLoading };
}
