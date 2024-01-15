import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth.js";
import { toast } from "react-hot-toast";

export function useSignUp() {
  const { mutate, isLoading } = useMutation({
    mutationFn: signUp,
    onSuccess: () =>
      toast.success(
        "Akun yang anda daftarkan berhasil dibuat, anda perlu melakukan verifikasi terlebih dahulu melalui email anda"
      ),
    onError: () => toast.error("Terjadi kesalahan saat mendaftarkan akun"),
  });

  return { signup: mutate, isLoading };
}
