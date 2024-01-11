import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings.js";

export function useGetBookings() {
  const {
    isLoading: isFetching,
    data: dataBookings,
    error: fetchError,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
  });

  return {isFetching, dataBookings, fetchError}
}
