import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function useGetBooking() {
  const { bookingId } = useParams();

  const {
    isLoading: isFetching,
    data: booking,
    error: fetchError,
  } = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
  });

  return { isFetching, booking: booking , fetchError };
}
