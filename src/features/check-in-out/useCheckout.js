import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";

export default function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (checkedInBooking) => {
      console.log(checkedInBooking);
      toast.success(
        `Berhasil melakukan check out pada Booking #${checkedInBooking.id}`
      );

      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error("Ada kegagalan dalam melakukan check out.");
    },
  });

  return { checkout, isCheckingOut };
}
