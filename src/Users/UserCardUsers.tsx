import { Row, Card, Col, Button } from "react-bootstrap";
import { Endpoints } from "@octokit/types";
import { RiGithubFill } from "react-icons/ri";
import { LinkContainer } from "react-router-bootstrap";

type GitUser = Endpoints["GET /search/users"]["response"]["data"]["items"][0];

export default function UserCardUsers({ items }: { items: GitUser[] }) {
  /*
        funckja odpowiedzialna za wyswietlanie kart użytkowników
    */

  return (
    <Row
      xs={1}
      md={2}
      lg={3}
      xl={4}
      xxl={5}
      className="justify-content-center w-100 m-0"
    >
      {
        //mapowanie na tablicę items
      }
      {items.map((item) => (
        <Col key={item.id} className="">
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
                {
                  // jeżeli typ uzytkownika to user wyświetl ikonkę użytkownika
                  // inaczej wyświetl ikonkę organizacji
                }
                {item.type === "User" ? "Użytkownik" : "Organizacja"}
              </Card.Text>
              <LinkContainer to={`/repos/${item.login}`}>
                <Button variant="primary" className="w-100">
                  Repozytoria
                </Button>
              </LinkContainer>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
