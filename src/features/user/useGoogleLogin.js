import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiGoogleLogin } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useGoogleLogin() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { isLoading, mutate: googleLogin } = useMutation({
    mutationFn: apiGoogleLogin,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success("Login successful");
      navigate("/app", { replace: true });
    },
    onError: (error) => {
      toast.error(error?.message || "Login failed. Please try again.");
    },
  });

  return { googleLogin, isLoading };
}
