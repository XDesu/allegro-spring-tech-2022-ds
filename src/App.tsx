import React from "react";
// import logo from "./logo.svg";
// import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navigation from "./Navigation";

export default function App() {
  return (
    <Container fluid className="p-0">
      <Router>
        <header>
          <Navigation />
        </header>
      </Router>
    </Container>
  );
}

// ReactDOM.render(<App />, document.getElementById("root"));
