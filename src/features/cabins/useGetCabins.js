import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins.js";

export function useGetCabins() {
  const {
    isLoading: isFetching,
    data: cabins,
    error: fetchError,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  return {isFetching, cabins, fetchError}
}
