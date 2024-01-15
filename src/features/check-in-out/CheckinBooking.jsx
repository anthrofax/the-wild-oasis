import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import useGetBooking from "../bookings/useGetBooking";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import useCheckin from "../bookings/useCheckin";
import { formatCurrency } from "../../utils/helpers";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const { isFetching, booking } = useGetBooking();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { checkin, isCheckingIn } = useCheckin();

  const {
    id: bookingId,
    guests: { fullName, email } = {},
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
  } = booking;

  useEffect(
    function () {
      setConfirmPaid(isPaid);
    },
    [isPaid]
  );

  function handleCheckin() {
    if (!confirmPaid) return;

    checkin(bookingId);
  }

  if (isFetching || isCheckingIn) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <Checkbox
        checked={confirmPaid}
        onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
        disabled={confirmPaid || isCheckingIn}
        id={bookingId}
      >
        Konfirmasi bahwa pelanggan {fullName} sudah melakukan pembayaran dengan total {formatCurrency(totalPrice)}
      </Checkbox>
      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
