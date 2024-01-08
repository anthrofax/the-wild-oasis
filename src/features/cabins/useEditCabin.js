import { createEditCabin } from "../../services/apiCabins.js";
import { toast } from "react-hot-toast";
import { useQueryClient, useMutation } from "@tanstack/react-query";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabin, id }) => createEditCabin(newCabin, id),
    onSuccess: () => {
      toast.success("Data cabin berhasil diperbarui");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editCabin, isEditing };
}
