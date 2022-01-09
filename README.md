# Zadanie nr 2. Frontend Software Engineer

## Instrukcja

Uruchomienie aplikacji

### `yarn start`

Uruchomi aplikację w trybie deweloperskim.
Wejdź na [http://localhost:3000](http://localhost:3000) aby zobaczyć stronę.

Strona będzie się przeładowywać w sytuacji jakiejkolwiek edycji.

W lini konsoli będą wyświetlane wszelkie błędy.

## Opis aplikacji

Aplikacja stworzona na potrzeby Allegro Spring Tech.

Aplikacja napisana w oparciu o bibliotekę React.js, przy czym językiem programowania był TypeScript.

Aplikacja pozwala nam na wyszukanie do 15 użytkowników spełniających nasze warunki (podaną nazwę użytkownika w belce nawigacji), a następnie po wybraniu jednego z pokazanych kont wyświetlenie jego publicznych repozytoriów posortowanych malejąco po ilości gwiazdek.

Ze względu na korzystanie z API udostępnianego przez GitHub, ilość zapytań jest ograniczana czasowo.

Podczas tworzenia aplikacji starałem się aby była schludna a kolorystycznie pasowała do barw allegro. Nie wprowadzałem również żadnych dodatkowych zmian w zakresie CSS, starając się w 100% wykorzystać możliwości dawane przez bibliotekę Bootstrap oraz React Bootstrap.

Szukana wartość jest przechowywana w osobnym kontekście w celu łatwego dostępu do tej wartości dla innych komponentów.

W panelu z wyszukanymi użytkownikami wyświetlanych jest maksymalnie 15 osób, z czego są oni posortowani w kolejności najlepszego dopasowania.

Po wciśnięciu przycisku repozytoria przechodzimy do części z repozytoriami.

W panelu z repozytoriami mamy 3 komponenty, z których pierwszy odpowiada za wyświetlenie karty wskazanego użytkownika (nazwa użytkownika jest przenoszona w adresie url), a dwa następne za wyświetlanie karty z jego publicznymi repozytoriami oraz paska wyboru strony z kartami repozytoriów.

Karta użytkownika dla repozytoriów zawiera więcej danych, w tym, jeżeli jest podany blog to wyświetla przycisk przekierowujący na tą stronę.

Karta repozytorium zawiera jego nazwę, ilość gwiazdek, jego opis oraz przycisk pozwalający przejść do wskazanego repozytorium na stronie githuba.

Pasek wyboru strony pozwala nam na pokazanie określonej części repozytoriów, gdzie wygląd paska zmienia się w zależności od aktualnej strony oraz samej ilości stron.
