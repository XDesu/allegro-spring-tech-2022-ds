import { useEffect, useState } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { useSearch } from "./SearchContext";
import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";
import { RiGithubFill } from "react-icons/ri";

type GitUser = Endpoints["GET /search/users"]["response"]["data"]["items"][0];

export default function SearchedUsersList() {
  const search = useSearch();

  const octokit = new Octokit();

  const [items, setItems] = useState<GitUser[]>([]);

  useEffect(() => {
    getUsers();
  }, [search]);

  const getUsers = async () => {
    try {
      const response = await octokit.rest.search.users({
        q: search,
        per_page: 10,
      });
      setItems(response.data.items);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container fluid className="p-0 text-center">
      {items.map((item) => (
        <Card style={{ width: "18rem" }} key={item.id} className="p-3 m-3">
          <Card.Img variant="top" src={item.avatar_url} />
          <Card.Body className="text-center">
            <Card.Title>
              {item.login}
              <a
                href={item.html_url}
                target="_blank"
                rel="noreferrer"
                className="ms-1 fs-2"
              >
                <RiGithubFill />
              </a>
            </Card.Title>
            <Card.Text>
              {item.type === "User" ? "Użytkownik" : "Organizacja"}
            </Card.Text>
            <Button variant="primary" className="w-100">
              Repozytoria
            </Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
