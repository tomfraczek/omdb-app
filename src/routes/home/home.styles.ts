import styled from "styled-components";
import { MainScreenContainerProps } from "./home.types";
import { color } from "../../theme";

export const MainScreenContainer = styled.div<MainScreenContainerProps>`
  display: flex;
  flex-direction: column;
  min-height: ${(props) => (props.hasResults ? "100vh" : "50vh")};
`;

export const ViewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.h2<MainScreenContainerProps>`
  color: white;
  text-align: center;
  font-size: ${(props) => (props.hasResults ? "1.5rem" : "3rem")};
  font-weight: 600;
`;

export const FiltersContainer = styled.div`
  display: flex;
  padding-left: 16px;
`;

export const ResultsHead = styled.div`
  background-color: ${color.white};
  width: 80%;
  margin: 0 auto;
`;

export const ResultsContainer = styled.div`
  background-color: ${color.white};
  width: 80%;
  margin: 0 auto;
`;

export const SearchHeader = styled.h2`
  text-align: center;
`;

export const ErrorMessage = styled.p`
  text-align: center;
`;