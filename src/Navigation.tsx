import {
  Container,
  Navbar,
  FloatingLabel,
  Form,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#home" className="m-3 fs-2">
          Allegro Spring Tech 2k22
        </Navbar.Brand>
        <Navbar.Text></Navbar.Text>
        <Form className="d-flex m-3">
          <FloatingLabel
            controlId="floatingInputGrid"
            label="Nazwa użytkownika"
            className="float-start"
          >
            <Form.Control type="text" placeholder="username" />
          </FloatingLabel>
          <Button variant="success">Szukaj</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Navigation;
