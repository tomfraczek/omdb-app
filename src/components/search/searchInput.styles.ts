import styled from "styled-components";
import { color } from "../../theme";

export const SearchContainer = styled.div`
  position: relative;
  width: 50%;
  height: 60px;
  margin: 0 auto;
`;

export const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  background-color: ${color.white};
  border: none;
  color: ${color.foreground};
  height: 44px;
  outline: 0;
  border-radius: 50px;
  padding-left: 40px;
`;

export const SearchIcon = styled.img`
  position: absolute;
  left: 10px;
  top: 10px;
  width: 25px;
`;
