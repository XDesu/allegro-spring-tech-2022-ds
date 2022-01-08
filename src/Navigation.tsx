import {
  Container,
  Navbar,
  FloatingLabel,
  Form,
  Button,
  Nav,
} from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { useSearchUpdate } from "./SearchContext";
import React, { useState } from "react";

const Navigation = () => {
  const searchUpdate = useSearchUpdate();
  const [search, setSearch] = useState("allegro");

  function updateSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    searchUpdate(search);
  }

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm">
      <Container fluid>
        <Navbar.Brand href="#home" className="m-3 fs-2">
          Allegro Spring Tech 2k22
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="navbarScroll">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
