import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins.js";
import { toast } from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  
  const { mutate: deleteCabin, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCabinAPI,
    onSuccess: () => {
      toast.success("Data cabin berhasil dihapus");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteCabin, isDeleting };
}
