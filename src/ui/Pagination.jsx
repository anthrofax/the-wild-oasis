import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { DATA_PER_PAGE } from "../utils/config";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;


function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));
  const pageCount = Math.ceil(count / DATA_PER_PAGE);

  function handleNext() {
    searchParams.set(
      "page",
      currentPage === pageCount ? currentPage : currentPage + 1
    );
    setSearchParams(searchParams);
  }

  function handlePrev() {
    searchParams.set("page", currentPage === 1 ? currentPage : currentPage - 1);
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Menampilkan <span>{(currentPage - 1) * DATA_PER_PAGE + 1}</span> -
        <span>
          {" "}
          {currentPage * DATA_PER_PAGE > count
            ? count
            : currentPage * DATA_PER_PAGE}
        </span>{" "}
        dari <span>{count}</span> data
      </P>

      <Buttons>
        <PaginationButton onClick={handlePrev} disabled={currentPage === 1}>
          <span>
            <HiChevronLeft />
          </span>
          Sebelumnya
        </PaginationButton>

        <PaginationButton onClick={handleNext} disabled={currentPage === pageCount}>
          Selanjutnya
          <span>
            <HiChevronRight />
          </span>
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
