import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Anda berhasil login");

      navigate("/dashboard");
    },
    onError: () => {
      toast.error("Email atau password yang anda masukkan tidak sesuai");
    },
  });

  return { login: mutate, isLoading };
}
