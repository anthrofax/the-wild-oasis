import { useState } from "react";
import styled from "styled-components";
import { HiSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";

import CreateCabinForm from "./CreateCabinForm.jsx";
import Row from "../../ui/Row.jsx";
import { formatCurrency } from "../../utils/helpers.js";

import { useDeleteCabin } from "./useDeleteCabin.js";
import { useCreateCabin } from "./useCreateCabin.js";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  const { createCabin, isCreating } = useCreateCabin();
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const [showForm, setShowForm] = useState(false);

  function handleShowForm() {
    setShowForm((showForm) => !showForm);
  }

  function handleDuplicateCabin() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
  }

  return (
    <>
      <TableRow>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Muat hingga {maxCapacity} orang</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <Row type="horizontal">
          <button disabled={isCreating} onClick={handleDuplicateCabin}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShowForm((showForm) => !showForm)}>
            <HiPencil />
          </button>
          <button onClick={() => deleteCabin(id)} disabled={isDeleting}>
            <HiTrash />
          </button>
        </Row>
      </TableRow>
      {showForm && (
        <CreateCabinForm dataToEdit={cabin} onShowForm={handleShowForm} />
      )}
    </>
  );
}

export default CabinRow;
