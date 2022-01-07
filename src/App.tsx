import React from "react";
// import logo from "./logo.svg";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navigation from "./Navigation";
import SearchedUsersList from "./SearchedUsersList";

export default function App() {
  return (
    <Container fluid className="p-0">
      <header>
        <Navigation />
      </header>
      <article>
        <Router>
          <Routes>
            <Route path="/" element={<SearchedUsersList />} />
          </Routes>
        </Router>
      </article>
    </Container>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
