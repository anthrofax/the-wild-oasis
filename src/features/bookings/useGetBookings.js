import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings.js";
import { useSearchParams } from "react-router-dom";

export function useGetBookings() {
  const [searchParams] = useSearchParams();

  const filteredValue = searchParams.get("status");
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { fieldName: "status", value: filteredValue };

  const {
    isLoading: isFetching,
    data: dataBookings,
    error: fetchError,
  } = useQuery({
    queryKey: ["bookings", filter],
    queryFn: () => getBookings({filter}),
  });

  return { isFetching, dataBookings, fetchError };
}
