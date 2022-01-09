import React, { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import UserCardRepos from "./UserCardRepos";

type GitUser = Endpoints["GET /users/{username}"]["response"]["data"];
type GitRepo =
  Endpoints["GET /search/repositories"]["response"]["data"]["items"][0];

const RepoList = () => {
  const urlName = window.location.pathname.split("/")[2];
  console.log(urlName);

  const octokit = new Octokit();

  const [repos, setRepos] = useState<GitRepo[]>([]);
  const [user, setUser] = useState<GitUser>();
  const [timerUser, setTimerUser] = useState<any>(null);
  const [timerRepos, setTimerRepos] = useState<any>(null);

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
  console.log(user);

  const getRepos = async () => {
    clearTimeout(timerRepos);
    try {
      const responseRepos = await octokit.rest.search.repos({
        q: `user:${urlName}+fork:true`,
        sort: `stars`,
        order: `desc`,
        per_page: 15,
        page: 2,
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

  console.log(repos);

  return (
    <Container fluid className="p-0">
      <Row className="justify-content-center">
        <Col
          sm="10"
          md="3"
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
        <Col
          sm="10"
          md="6"
          lg="6"
          xl="6"
          xxl="6"
          style={{ backgroundColor: "yellow" }}
        >
          sadasdasdasd
        </Col>
      </Row>
      <Button onClick={getUser}>Click</Button>
      <Button onClick={getRepos}>Click</Button>
    </Container>

    // reader();
  );
};

export default RepoList;
