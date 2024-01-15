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
import { useGetSettings } from "../settings/useGetSetting";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const moveBack = useMoveBack();

  const { isFetching, booking } = useGetBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isFetching: isLoadingSettings } = useGetSettings();

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

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice,
        },
      });
    } else {
      checkin({ bookingId, breakfast: {} });
    }
  }

  console.log(settings);
  const optionalBreakfastPrice = hasBreakfast
    ? 0
    : settings?.breakfastPrice * numGuests * numNights;

  if (isFetching || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((addBreakfast) => !addBreakfast);
              setConfirmPaid(false);
            }}
            id="breakfast"
          >
            Ingin menambahkan pesanan sarapan (
            {formatCurrency(optionalBreakfastPrice)})?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          checked={confirmPaid}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          disabled={confirmPaid || isCheckingIn}
          id="confirm"
        >
          Konfirmasi bahwa pelanggan {fullName} sudah melakukan pembayaran
          dengan total{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : ` ${formatCurrency(totalPrice + optionalBreakfastPrice)} (
                ${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )}
              )`}
        </Checkbox>
      </Box>

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
