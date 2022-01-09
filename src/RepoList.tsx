import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import UserCardRepos from "./UserCardRepos";
import RepoCardRepos from "./RepoCardRepos";
import PaginationForRepos from "./PaginationForRepos";

type GitUser = Endpoints["GET /users/{username}"]["response"]["data"];
type GitRepo =
  Endpoints["GET /search/repositories"]["response"]["data"]["items"][0];

const RepoList = () => {
  let reposOnPage = 10;
  const urlName = window.location.pathname.split("/")[2];
  const octokit = new Octokit();

  const [repos, setRepos] = useState<GitRepo[]>([]);
  const [user, setUser] = useState<GitUser>();
  const [timerUser, setTimerUser] = useState<any>(null);
  const [timerRepos, setTimerRepos] = useState<any>(null);
  const [iPagin, setIPagin] = useState<number>(1);
  const [pagePagin, setPagePagin] = useState<number>(1);

  useEffect(() => {
    getUser();
    return () => {
      clearTimeout(timerUser);
      clearTimeout(timerRepos);
    };
  }, []);

  useEffect(() => {
    getRepos();
  }, [pagePagin, iPagin]);

  const getUser = async () => {
    clearTimeout(timerUser);
    try {
      const responseUser = await octokit.rest.users.getByUsername({
        username: urlName,
      });
      setUser(responseUser.data);
      setIPagin(
        Math.ceil((responseUser.data.public_repos as number) / reposOnPage)
      );
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
        per_page: reposOnPage,
        page: pagePagin,
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
  console.log(iPagin);
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
          {repos === undefined ? (
            <>
              Repozytoria użytkownika
              <Spinner animation="border" role="status" className="s-50 t-50">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </>
          ) : (
            <>
              <RepoCardRepos repos={repos} />
              {console.log(iPagin)}
              <PaginationForRepos
                activePage={pagePagin}
                totalPages={iPagin}
                onPageChange={(page: number) => {
                  setPagePagin(page);
                }}
              />
            </>
          )}
        </Col>
      </Row>
    </Container>

    // reader();
  );
};

export default RepoList;
