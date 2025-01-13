import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiSignup } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isLoading, mutate: signup } = useMutation({
    mutationFn: apiSignup,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success("Signup successful");
      navigate("/app", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.message || "Signup failed. Please try again.");
    },
  });

  return { signup, isLoading };
}
