import styled from "styled-components";
import { color } from "../../theme";
import { device } from "../../theme/breakpoints";

export const SearchContainer = styled.div`
  position: relative;
  width: 80%;
  height: 60px;
  margin: 0 auto;

  @media ${device.tablet} {
    width: 50%;
  }
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

export const ResetIcon = styled.img`
  position: absolute;
  right: 10px;
  top: calc(50% - 18px);
  width: 20px;
  cursor: pointer;
`;

export const AdvanceSearchButton = styled.button`
  border: none;
  background-color: transparent;
  color: ${color.white};
  margin-top: 8px;

  &:focus {
    border: none;
    outline: none;
  }
`;
