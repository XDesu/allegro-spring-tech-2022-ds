import React, { useState } from "react";
import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { RiGitRepositoryLine } from "react-icons/ri";
import { BsPeople, BsPerson } from "react-icons/bs";
import { VscOrganization } from "react-icons/vsc";
import { BiUser } from "react-icons/bi";

type GitUser = Endpoints["GET /users/{username}"]["response"]["data"];
type GitRepo =
  Endpoints["GET /search/repositories"]["response"]["data"]["items"][0];

const RepoList = () => {
  const urlName = window.location.pathname.split("/")[2];
  console.log(urlName);

  const octokit = new Octokit();

  const [repos, setRepos] = useState<GitRepo[]>([]);
  const [user, setUser] = useState<GitUser>();

  const getUser = async () => {
    try {
      const responseUser = await octokit.rest.users.getByUsername({
        username: urlName,
      });
      setUser(responseUser.data);
      console.log(responseUser);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(user);

  const getRepos = async () => {
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
        >
          <Card style={{ width: "18rem" }} className="p-2">
            <Card.Img variant="top" src={user?.avatar_url as string} />
            <Card.Body className="pb-0">
              <Card.Title>{user?.name as string}</Card.Title>
              <Card.Text>{user?.bio as string}</Card.Text>
              <ListGroup variant="flush" className="text-center pb-0">
                <ListGroup.Item className="pt-0">
                  {user?.type === "User" ? (
                    <>
                      <BiUser className="fs-3" /> Użytkownik
                    </>
                  ) : (
                    <>
                      <VscOrganization className="fs-3" />
                      Organizacja
                    </>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <RiGitRepositoryLine className="fs-3" />
                  {user?.public_repos} repozytoria
                </ListGroup.Item>
                <ListGroup.Item>
                  <BsPeople className="fs-3" />
                  Obserwujący {user?.followers}
                </ListGroup.Item>
                <ListGroup.Item>
                  <BsPerson className="fs-3" />
                  Obserwuje: {user?.following}
                </ListGroup.Item>
                <ListGroup.Item className="pb-0">
                  {user?.blog ? (
                    <Button href={user.blog as string}>
                      Strona internetowa
                    </Button>
                  ) : null}
                </ListGroup.Item>
                {/* {user?.blog && <Button href={user.blog as string}>Blog</Button>} */}
              </ListGroup>
            </Card.Body>
          </Card>
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
