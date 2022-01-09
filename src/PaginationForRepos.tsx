import { Pagination } from "react-bootstrap";

interface PaginationForReposProps {
  activePage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PaginationForRepos({
  activePage,
  totalPages,
  onPageChange,
}: PaginationForReposProps) {
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
