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

  const sortByRaw = searchParams.get('sortBy') || 'startDate-dsc'
  const [field, direction] = sortByRaw.split('-');
  const sortBy = {fieldName: field, direction};

  const {
    isLoading: isFetching,
    data: dataBookings,
    error: fetchError,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({filter, sortBy}),
  });

  return { isFetching, dataBookings, fetchError };
}
