import styled from "styled-components";
import { color } from "../../theme";

export const FilmContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  background-color: ${color.white};
  padding: 0 16px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilmTitle = styled.h2`
  font-size: 2rem;
`;

export const ScoreContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const RatingWrapper = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin: 0;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
`;

export const PosterContainer = styled.div`
  margin-right: 25px;
  max-width: 150px;
`;

export const PosterImg = styled.img`
  width: 100%;
  border-radius: 7px;
`;

export const DescriptionContainer = styled.div`
  width: 100%;
`;

export const FilmPlot = styled.p`
  text-align: left;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Cast = styled.p``;
