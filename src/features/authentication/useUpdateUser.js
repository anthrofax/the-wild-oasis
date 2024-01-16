import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth.js";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({user}) => {
      toast.success("Data user berhasil diubah");
      console.log(user)

      queryClient.setQueryData(['user'], user);

      // queryClient.invalidateQueries({
      //   queryKey: ["user"],
      // });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
