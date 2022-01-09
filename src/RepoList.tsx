import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import UserCardRepos from "./UserCardRepos";

type GitUser = Endpoints["GET /users/{username}"]["response"]["data"];
type GitRepo =
  Endpoints["GET /search/repositories"]["response"]["data"]["items"][0];

const RepoList = () => {
  const urlName = window.location.pathname.split("/")[2];
  const octokit = new Octokit();

  const [repos, setRepos] = useState<GitRepo[]>([]);
  const [user, setUser] = useState<GitUser>();
  const [timerUser, setTimerUser] = useState<any>(null);
  const [timerRepos, setTimerRepos] = useState<any>(null);
  const [iPagin, setIPagin] = useState<number>(1);

  useEffect(() => {
    getUser();
    getRepos();
    return () => {
      clearTimeout(timerUser);
      clearTimeout(timerRepos);
    };
  }, []);

  const getUser = async () => {
    clearTimeout(timerUser);
    try {
      const responseUser = await octokit.rest.users.getByUsername({
        username: urlName,
      });
      setUser(responseUser.data);
      setIPagin(Math.ceil((user?.public_repos as number) / 9));
      console.log(responseUser);
    } catch (error) {
      console.log(error);
      setTimerUser(
        setTimeout(() => {
          getUser();
        }, 5000)
      );
    }
  };

  const getRepos = async () => {
    clearTimeout(timerRepos);
    try {
      const responseRepos = await octokit.rest.search.repos({
        q: `user:${urlName}+fork:true`,
        sort: `stars`,
        order: `desc`,
        per_page: 9,
        page: iPagin,
      });
      setRepos(responseRepos.data.items);
      console.log(responseRepos);
    } catch (error) {
      console.log(error);
      setTimerRepos(
        setTimeout(() => {
          getRepos();
        }, 5000)
      );
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="justify-content-center">
        <Col
          sm="10"
          md="4"
          lg="3"
          xl="3"
          xxl="3"
          //   style={{ backgroundColor: "blue" }}
          className="text-center"
        >
          {user === undefined ? (
            <>
              Karta użytkownika
              <Spinner animation="border" role="status" className="s-50 t-50">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </>
          ) : (
            <UserCardRepos user={user} />
          )}
        </Col>
        <Col sm="10" md="6" lg="6" xl="6" xxl="6">
          <Container fluid className="p-0 d-flex flex-wrap">
            {repos.map((repo) => (
              <Card style={{ width: "12rem", height: "18rem" }} className="m-3">
                <Card.Body>
                  <Card.Title>{repo.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {repo.stargazers_count}
                  </Card.Subtitle>
                  <Card.Text
                    className="overflow-auto"
                    style={{ height: "9rem" }}
                  >
                    {repo.description === null
                      ? "Brak opisu"
                      : repo.description}
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
        </Col>
      </Row>
    </Container>

    // reader();
  );
};

export default RepoList;
