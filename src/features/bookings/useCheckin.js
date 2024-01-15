import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";

export default function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
      }),
    onSuccess: (checkedInBooking) => {
      console.log(checkedInBooking);
      toast.success(
        `Berhasil melakukan check in pada Booking #${checkedInBooking.id}`
      );

      queryClient.invalidateQueries({ active: true });

      navigate("/");
    },
    onError: (err) => {
      console.log(err);
      toast.error("Ada kegagalan dalam melakukan checkin.");
    },
  });

  return { checkin, isCheckingIn };
}
