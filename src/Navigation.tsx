import {
  Container,
  Navbar,
  FloatingLabel,
  Form,
  Button,
  Nav,
} from "react-bootstrap";
import { useSearchUpdate } from "./Context/SearchContext";
import React, { useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const searchUpdate = useSearchUpdate();
  const [search, setSearch] = useState("allegro");

  function updateSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    searchUpdate(search);
    navigate("/");
  }

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="sm">
      <Container fluid>
        <LinkContainer to="/">
          <Navbar.Brand className="m-3 fs-2">
            Allegro Spring Tech 2k22
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="navbarScroll">
          <Nav className="ms-auto">
            <Form
              className="d-flex m-3 justify-content-end"
              onSubmit={updateSearch}
            >
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
