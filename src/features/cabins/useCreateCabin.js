import { createEditCabin } from "../../services/apiCabins.js";
import { toast } from "react-hot-toast";
import {useQueryClient, useMutation} from '@tanstack/react-query'

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("Data cabin berhasil ditambahkan");

      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { createCabin, isCreating };
}
