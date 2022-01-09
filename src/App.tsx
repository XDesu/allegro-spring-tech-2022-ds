import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navigation from "./Navigation/Navigation";
import RepoList from "./Repo/RepoList";
import SearchedUsersList from "./Users/SearchedUsersList";
import SearchProvider from "./Context/SearchContext";
import "./App.scss";

export default function App() {
  return (
    <Container fluid className="p-0 m-0" style={{ backgroundColor: "#eceff1" }}>
      <SearchProvider>
        <Router>
          <header>
            <Navigation />
          </header>
          <article>
            <Routes>
              <Route path="/" element={<SearchedUsersList />} />
              <Route path="/repos/:id" element={<RepoList />} />
            </Routes>
          </article>
        </Router>
      </SearchProvider>
    </Container>
  );
}
