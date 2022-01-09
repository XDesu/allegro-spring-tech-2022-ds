import { RiGitRepositoryLine } from "react-icons/ri";
import { BsPeople, BsPerson } from "react-icons/bs";
import { VscOrganization } from "react-icons/vsc";
import { BiUser } from "react-icons/bi";
import { Button, Card, ListGroup } from "react-bootstrap";
import { Endpoints } from "@octokit/types";

type GitUser = Endpoints["GET /users/{username}"]["response"]["data"];

export default function UserCardRepos({ user }: { user: GitUser }) {
  return (
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
              <Button href={user.blog as string}>Strona internetowa</Button>
            ) : null}
          </ListGroup.Item>
          {/* {user?.blog && <Button href={user.blog as string}>Blog</Button>} */}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}
