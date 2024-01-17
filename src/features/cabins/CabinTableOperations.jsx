import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          {
            value: "all",
            label: "Semua",
          },
          {
            value: "no-discount",
            label: "Tanpa diskon",
          },
          {
            value: "with-discount",
            label: "Dengan diskon",
          },
        ]}
      />
      <SortBy options={[
        {
          value: 'name-asc',
          label: 'Urutkan berdasarkan nama (A-Z)'
        },
        {
          value: 'name-dsc',
          label: 'Urutkan berdasarkan nama (Z-A)'
        },
        {
          value: 'regularPrice-asc',
          label: 'Urutkan berdasarkan Harga Normal (Low First)'
        },
        {
          value: 'regularPrice-dsc',
          label: 'Urutkan berdasarkan Harga Normal (High First)'
        },
        {
          value: 'maxCapacity-asc',
          label: 'Urutkan berdasarkan Kapasitas Maksimum (Low First)'
        },
        {
          value: 'maxCapacity-dsc',
          label: 'Urutkan berdasarkan Kapasitas Maksimum (High First)'
        },
      ]} />
    </TableOperations>
  );
}

export default CabinTableOperations;
