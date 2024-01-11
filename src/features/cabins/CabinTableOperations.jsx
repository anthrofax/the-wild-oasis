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
            label: "All",
          },
          {
            value: "no-discount",
            label: "No Discount",
          },
          {
            value: "with-discount",
            label: "With Discount",
          },
        ]}
      />
      <SortBy options={[
        {
          value: 'name-asc',
          label: 'Sort by Name (A-Z)'
        },
        {
          value: 'name-dsc',
          label: 'Sort by Name (Z-A)'
        },
        {
          value: 'regularPrice-asc',
          label: 'Sort by Regular Price (Low First)'
        },
        {
          value: 'regularPrice-dsc',
          label: 'Sort by Regular Price (High First)'
        },
        {
          value: 'maxCapacity-asc',
          label: 'Sort by Maximum Capacity (Low First)'
        },
        {
          value: 'maxCapacity-dsc',
          label: 'Sort by Maximum Capacity (High First)'
        },
      ]} />
    </TableOperations>
  );
}

export default CabinTableOperations;
