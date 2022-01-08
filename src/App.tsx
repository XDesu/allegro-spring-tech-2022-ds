import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navigation from "./Navigation";
import SearchedUsersList from "./SearchedUsersList";
import SearchProvider from "./SearchContext";

export default function App() {
  return (
    <Container fluid className="p-0">
      <SearchProvider>
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
      </SearchProvider>
    </Container>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
