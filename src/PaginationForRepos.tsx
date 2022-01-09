import { Pagination } from "react-bootstrap";

export default function PaginationForRepos(
  activePage: number,
  totalPages: number,
  onPageChange: (page: number) => void
) {
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => {
          onPageChange(number);
        }}
      >
        {number}
      </Pagination.Item>
    );
  }

  return <Pagination size="sm">{items}</Pagination>;
}
