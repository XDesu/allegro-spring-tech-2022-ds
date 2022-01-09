import { Endpoints } from "@octokit/types";
import { Button, Card, Container } from "react-bootstrap";
import { AiFillStar } from "react-icons/ai";

type GitRepo =
  Endpoints["GET /search/repositories"]["response"]["data"]["items"][0];

export default function RepoCardRepos({ repos }: { repos: GitRepo[] }) {
  return (
    <Container fluid className="p-0 d-flex flex-wrap">
      {repos.map((repo) => (
        <Card style={{ width: "12rem", height: "18rem" }} className="m-3">
          <Card.Body>
            <Card.Title>{repo.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <AiFillStar />
              {repo.stargazers_count}
            </Card.Subtitle>
            <Card.Text className="overflow-auto" style={{ height: "9rem" }}>
              {repo.description === null ? "Brak opisu" : repo.description}
            </Card.Text>
            <Container className="text-center">
              <Button href={repo.html_url} className="px-2">
                Zobacz repo
              </Button>
            </Container>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}
