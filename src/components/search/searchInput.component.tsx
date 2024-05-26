import { SearchContainer, SearchInput, SearchIcon } from "./searchInput.styles";

import searchIcon from "../../images/icons/search.svg";

type SearchInputProps = {
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  setSearch: (value: string) => void;
};

export const Search = ({ handleKeyDown, setSearch }: SearchInputProps) => {
  return (
    <SearchContainer>
      <SearchIcon src={searchIcon} />
      <SearchInput
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search"
      />
    </SearchContainer>
  );
};
