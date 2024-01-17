import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function BookingTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "All" },
          { value: "checked-out", label: "Telah Check out" },
          { value: "checked-in", label: "Telah Check in" },
          { value: "unconfirmed", label: "Belum terkonfirmasi" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Urutkan berdasarkan tanggal (terkini)" },
          { value: "startDate-asc", label: "Urutkan berdasarkan tanggal (terlama)" },
          {
            value: "totalPrice-desc",
            label: "Urutkan berdasarkan harga (Termahal)",
          },
          { value: "totalPrice-asc", label: "Urutkan berdasarkan harga (Termurah)" },
        ]}
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
