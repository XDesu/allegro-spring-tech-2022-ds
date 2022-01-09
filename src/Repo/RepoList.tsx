import { useEffect, useState } from "react";
import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import UserCardRepos from "./UserCardRepos";
import RepoCardRepos from "./RepoCardRepos";
import PaginationForRepos from "./PaginationForRepos";

type GitUser = Endpoints["GET /users/{username}"]["response"]["data"];
type GitRepo =
  Endpoints["GET /search/repositories"]["response"]["data"]["items"][0];

const RepoList = () => {
  /*
  funkcja odpowiedzialna za wyświetlenie panelu z repozytoriami
  */

  let reposOnPage = 10;
  const urlName = window.location.pathname.split("/")[2];
  const octokit = new Octokit();

  const [repos, setRepos] = useState<GitRepo[]>([]);
  const [user, setUser] = useState<GitUser>();
  const [timerUser, setTimerUser] = useState<any>(null);
  const [timerRepos, setTimerRepos] = useState<any>(null);
  const [iPagin, setIPagin] = useState<number>(1);
  const [pagePagin, setPagePagin] = useState<number>(1);
  const [error, setError] = useState<boolean>(false);

  // wywołanie funkcji pobierającej dane użytkownika
  useEffect(() => {
    getUser();
  }, [urlName]);

  useEffect(() => {
    return () => {
      clearTimeout(timerUser);
      clearTimeout(timerRepos);
    };
  }, []);

  /* 
    wywołanie funkcji pobierającej repozytoria użytkownika
    gdy zostanie pobrany użytkownik
    lub zostanie zmieniony numer strony 
  */

  useEffect(() => {
    getRepos();
  }, [pagePagin, iPagin]);

  /*
    funkcja odpowiedzialna za pobieranie danych użytkownika
    gdy zostanie pobrany użytkownik jest przypisywany do zmiennej user
    oraz zostanie określona wartość zmiennej iPagin 
    określającej ilość stron z repozytoriami
    jeżlei zapytanie się nie powiedzie to zostanie ono ponowione po 5 sekundach 
  */
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
          console.log("timeout");
          getUser();
        }, 5000)
      );
    }
  };

  /*
    funkcja odpowiadająca za pobieranie repozytoriów użytkownika
    gdy zostanie pobrany użytkownik to zostaje przypisany do zmiennej repos
    a zmienna error zostaje ustawiona na false
    jeżeli zapytanie się nie powiedzie to zostaje ono ponowione po 5 sekundach
    a jeżeli błąd miał status 422 to zmienna error zostaje ustawiona na true
  */
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
      setError(false);
      console.log(responseRepos);
    } catch (error: any) {
      console.log(error);
      if (error?.status === 422) {
        setError(true);
      }
      setTimerRepos(
        setTimeout(() => {
          getRepos();
        }, 5000)
      );
    }
  };

  return (
    <Container className="p-0">
      <Row className="justify-content-center mt-4 ms-2">
        <Col sm="12" md="4" lg="4" xl="3" xxl="3" className="text-center">
          {/*
              jeżeli zmienna user jest pusta to wyświetlany jest 'ekran ładowania danych'
              w przeciwnym wypadku wyświetlany jest panel z danymi użytkownika
            */}
          {user === undefined ? (
            <Container>
              <Spinner animation="border" role="status" className="s-50 t-50">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <br />
              <a>Użytkownik</a>
            </Container>
          ) : (
            <UserCardRepos user={user} />
          )}
        </Col>
        <Col sm="12" md="7" lg="7" xl="9" xxl="9">
          {/*
              jeżeli zmienna repos jest pusta a zmienna error jest false 
              to wyświetlany jest 'ekran ładowania danych'
              jeżeli zmienna repos jest pusta a zmienna error jest true
              to wyświetlany jest 'brak repozytoriów'
              w przeciwnym wypadku wyświetlany jest panel z repozytoriami
              i przyciski do nawigacji
            */}
          {repos.length == 0 ? (
            error ? (
              <Container className="w-100 text-center pt-4">
                <h1>Nie znaleziono repozytoriów</h1>
              </Container>
            ) : (
              <Container className="w-100 text-center pt-4">
                <Spinner animation="border" role="status" className="s-50 t-50">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
                <br />
                <a>Repozytoria</a>
              </Container>
            )
          ) : (
            <Container className="justify-content-center">
              <RepoCardRepos repos={repos} />
              <PaginationForRepos
                activePage={pagePagin}
                totalPages={iPagin}
                onPageChange={(page: number) => {
                  setPagePagin(page);
                }}
              />
            </Container>
          )}
        </Col>
      </Row>
    </Container>

    // reader();
  );
};

export default RepoList;
