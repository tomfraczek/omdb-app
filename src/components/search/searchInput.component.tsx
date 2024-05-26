import {
  SearchContainer,
  SearchInput,
  SearchIcon,
  ResetIcon,
} from "./searchInput.styles";

import searchIcon from "../../images/icons/search.svg";
import resetIcon from "../../images/icons/reset.svg";

type SearchInputProps = {
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  setSearch: (value: string) => void;
  resetSearch: () => void;
  value: string;
  displayReset: boolean;
};

export const Search = ({
  handleKeyDown,
  setSearch,
  resetSearch,
  value,
  displayReset,
}: SearchInputProps) => {
  return (
    <SearchContainer>
      <SearchIcon src={searchIcon} />
      <SearchInput
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search"
        value={value}
      />
      {displayReset && <ResetIcon src={resetIcon} onClick={resetSearch} />}
    </SearchContainer>
  );
};
