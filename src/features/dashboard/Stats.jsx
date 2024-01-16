import { formatCurrency } from "../../utils/helpers";
import Stat from "./Stat";
import {
  HiOutlineBriefcase,
  HiOutlineBanknotes,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";

function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const totalBookings = bookings.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const totalCheckin = confirmedStays.length;

  const rasioPenginapan =  confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount)

  return (
    <>
      <Stat
        icon={<HiOutlineBriefcase />}
        title="Total Booking"
        value={totalBookings}
        color="blue"
      />
      <Stat
        icon={<HiOutlineBanknotes />}
        title="Penjualan"
        value={formatCurrency(sales)}
        color="green"
      />
      <Stat
        icon={<HiOutlineCalendarDays />}
        title="Total Checkin"
        value={totalCheckin}
        color="indigo"
      />
      <Stat
        icon={<HiOutlineChartBar />}
        title="Rasio Penginapan"
        value={Math.round(rasioPenginapan * 100) + "%"}
        color="yellow"
      />
    </>
  );
}

export default Stats;
