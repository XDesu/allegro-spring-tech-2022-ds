import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useState,
} from "react";

const SearchContext = React.createContext("allegro");

const SearchUpdateContext = React.createContext<
  Dispatch<SetStateAction<string>>
>(() => {});

const SearchProvider: FC = ({ children }) => {
  // funkcja przechowująca wartośc wpisywaną w polu wyszukiwania - nazwa użytkownika
  const [search, setSearch] = useState("allegro");

  return (
    <SearchContext.Provider value={search}>
      <SearchUpdateContext.Provider value={setSearch}>
        {children}
      </SearchUpdateContext.Provider>
    </SearchContext.Provider>
  );
};

export default SearchProvider;

export function useSearch() {
  return useContext(SearchContext);
}

export function useSearchUpdate() {
  return useContext(SearchUpdateContext);
}
