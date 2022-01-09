import { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col, Spinner } from "react-bootstrap";
import { useSearch } from "../Context/SearchContext";
import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";
import { RiGithubFill } from "react-icons/ri";
import { LinkContainer } from "react-router-bootstrap";
import UserCardUsers from "./UserCardUsers";

type GitUser = Endpoints["GET /search/users"]["response"]["data"]["items"][0];

export default function SearchedUsersList() {
  const search = useSearch();

  const octokit = new Octokit();

  const [items, setItems] = useState<GitUser[]>([]);
  const [timer, setTimer] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    getUsers();
  }, [search]);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const getUsers = async () => {
    try {
      const response = await octokit.rest.search.users({
        q: `${search} in:login`,
        per_page: 15,
      });
      setItems(response.data.items);
      setError(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(true);
      setTimer(
        setTimeout(() => {
          getUsers();
        }, 5000)
      );
    }
  };

  return (
    <Container fluid className="p-1 text-center pt-5">
      {items.length > 0 ? (
        <UserCardUsers items={items} />
      ) : error ? (
        <Container>
          <Spinner animation="border" role="status" className="s-50 t-50">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <br />
          <a>Użytkownicy</a>
        </Container>
      ) : (
        <Container>
          <h1>Brak takich użytkowników</h1>
        </Container>
      )}
    </Container>
  );
}
