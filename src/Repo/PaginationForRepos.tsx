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

  if (activePage >= 4) {
    items.push(
      <Pagination.First key="first" onClick={() => onPageChange(1)} />
    );
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => onPageChange(activePage - 1)}
      />
    );
    items.push(
      <Pagination.Item key="1" onClick={() => onPageChange(1)}>
        1
      </Pagination.Item>
    );
    items.push(<Pagination.Ellipsis key="ellipsis1" />);
  } else {
    if (activePage > 1) {
      items.push(
        <Pagination.First key="first" onClick={() => onPageChange(1)} />
      );
      items.push(
        <Pagination.Prev
          key="prev"
          onClick={() => onPageChange(activePage - 1)}
        />
      );
    }
  }

  for (let i = activePage - 2; i <= activePage; i++) {
    if (i > 0) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === activePage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
  }

  if (activePage + 4 <= totalPages) {
    for (let i = activePage + 1; i <= activePage + 2; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === activePage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    items.push(<Pagination.Ellipsis key="ellipsis2" />);
    items.push(
      <Pagination.Item
        key={totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => onPageChange(activePage + 1)}
      />
    );
    items.push(
      <Pagination.Last key="last" onClick={() => onPageChange(totalPages)} />
    );
  } else {
    if (activePage < totalPages) {
      for (let i = activePage + 1; i <= totalPages; i++) {
        items.push(
          <Pagination.Item
            key={i}
            active={i === activePage}
            onClick={() => onPageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
      items.push(
        <Pagination.Next
          key="next"
          onClick={() => onPageChange(activePage + 1)}
        />
      );
    }
  }

  return (
    <Pagination className="mt-3 w-100 justify-content-center ">
      {items}
    </Pagination>
  );
}
