import {
  Container,
  Navbar,
  FloatingLabel,
  Form,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useSearch, useSearchUpdate } from "./SearchContext";
import React, { useState } from "react";

const Navigation = () => {
  const searchUpdate = useSearchUpdate();
  const [search, setSearch] = useState("allegro");

  function updateSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    searchUpdate(search);
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home" className="m-3 fs-2">
          Allegro Spring Tech 2k22
        </Navbar.Brand>
        <Navbar.Text></Navbar.Text>
        <Form className="d-flex m-3" onSubmit={updateSearch}>
          <FloatingLabel
            controlId="floatingInputGrid"
            label="Nazwa użytkownika"
            className="float-start"
          >
            <Form.Control
              type="text"
              placeholder="username"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => setSearch("")}
            />
          </FloatingLabel>
          <Button type="submit" variant="success">
            Szukaj
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Navigation;
