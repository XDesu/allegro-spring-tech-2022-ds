import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useSearch } from "../Context/SearchContext";
import { Octokit } from "@octokit/rest";
import { Endpoints } from "@octokit/types";
import UserCardUsers from "./UserCardUsers";

type GitUser = Endpoints["GET /search/users"]["response"]["data"]["items"][0];

export default function SearchedUsersList() {
  const search = useSearch();

  const octokit = new Octokit();

  const [items, setItems] = useState<GitUser[]>([]);
  const [timer, setTimer] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);

  /*
    jeżeli search się zmieni 
    to zostanie wywołana funkcja pobierająca dane użytkownika
  */
  useEffect(() => {
    getUsers();
  }, [search]);

  /*
    funkcja odpowiedzialna za zabespieczenie pobierania danych użytkownika -
    - clearTimeout
  */
  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, []);

  /*
    funkcja odpowiedzialna za pobieranie danych użytkowników
    gdy zostaną pobrani użytkownicy są przypisywani do zmiennej items
    oraz zmienna error zostanie ustawiona na false
    w przypadku błędu zostanie ona ustawiona na true
    i zostanie wywołana po 5 sekundach funkcja pobierająca dane użytkownika
  */
  const getUsers = async () => {
    try {
      const response = await octokit.rest.search.users({
        q: `${search} in:login`,
        per_page: 15,
      });
      setItems(response.data.items);
      setError(false);
      console.log(response);
    } catch (error) {
      console.log(error);
      setError(true);
      setTimer(
        setTimeout(() => {
          getUsers();
        }, 5000)
      );
    }
  };

  return (
    <Container fluid className="p-1 text-center pt-5">
      {/*
          jeżeli długośc tacy items jest weiększa od 0 
          to zostaną wyświetlone karty użytkowników
          w przeciwnym wypadku gdy error jest true 
          to wyświetlany jest ekran ładowania danych
          a jeżeli nie to wyświetlamy komunikat o braku użytkowników
        */}
      {items.length > 0 ? (
        <UserCardUsers items={items} />
      ) : error ? (
        <Container>
          <Spinner animation="border" role="status" className="s-50 t-50">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <br />
          <a>Użytkownicy</a>
        </Container>
      ) : (
        <Container>
          <h1>Brak takich użytkowników</h1>
        </Container>
      )}
    </Container>
  );
}
