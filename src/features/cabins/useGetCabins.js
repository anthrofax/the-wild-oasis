import { useQuery } from "@tanstack/react-query";
import { getCabin } from "../../services/apiCabins.js";

export function useGetCabins() {
  const {
    isLoading: isFetching,
    data: cabins,
    error: fetchError,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabin,
  });

  return {isFetching, cabins, fetchError}
}
