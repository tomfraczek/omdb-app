import styled from "styled-components";
import { color } from "../../theme";

export const AccordionContainer = styled.div`
  margin-top: 10px;
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
