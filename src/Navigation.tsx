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
        <Navbar.Brand href="#home">Allegro Spring Tech 2k22</Navbar.Brand>
        <Navbar.Text></Navbar.Text>
        <Form className="d-flex">
          <FloatingLabel
            controlId="floatingInputGrid"
            label="Email address"
            className="float-start"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <Button variant="success">Szukaj</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Navigation;
