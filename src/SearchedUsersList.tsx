import { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
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
    <Container fluid className="p-1 text-center d-flex flex-wrap">
      <Row xs={1} md={2} lg={3} xl={4} xxl={5}>
        {items.map((item) => (
          <Col key={item.id}>
            <Card
              style={{ width: "25rem", marginBottom: "5rem" }}
              key={item.id}
              className="p-3 mx-auto mt-3"
            >
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
          </Col>
        ))}
      </Row>
    </Container>
  );
}
