import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings.js";
import { useSearchParams } from "react-router-dom";

export function useGetBookings() {
  const [searchParams] = useSearchParams();

  // FILTER
  const filteredValue = searchParams.get("status");
  const filter =
    !filteredValue || filteredValue === "all"
      ? null
      : { fieldName: "status", value: filteredValue };

  // SORT
  const sortByRaw = searchParams.get("sortBy") || "startDate-dsc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { fieldName: field, direction };

  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    isLoading: isFetching,
    data: { bookings: dataBookings, count } = {} ,
    error: fetchError,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  return { isFetching, dataBookings, count, fetchError } ;
}
