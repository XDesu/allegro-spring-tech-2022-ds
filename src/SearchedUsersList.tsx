import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useSearch } from "./SearchContext";

export default function SearchedUsersList() {
  const search = useSearch();
  return (
    <Container fluid className="p-0">
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{search}</Card.Title>
          <Card.Text>Może dane do użytkownika</Card.Text>
          <Button variant="primary">Repozytorium</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
