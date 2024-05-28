import styled from "styled-components";
import { color } from "../../theme";
import { device } from "../../theme/breakpoints";

export const FilmContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  background-color: ${color.white};
  padding: 0 16px 34px 16px;
`;

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 16px;
  margin-bottom: 16px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Notification = styled.p`
  color: ${color.darkGray};
`;

export const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Info = styled.p`
  text-transform: capitalize;
  margin-right: 5px;
`;

export const FilmTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0;
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
  flex-wrap: wrap;

  @media ${device.mobile} {
    flex-wrap: nowrap;
  }
`;

export const PosterContainer = styled.div`
  max-width: 80%;
  margin: 0 auto;
  margin-bottom: 16px;
  @media ${device.mobile} {
    margin-right: 25px;
    max-width: 150px;
  }
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
  margin: 0;
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

export const SectionTitle = styled.p`
  margin: 0;
  font-weight: bold;
`;

export const Cast = styled.p`
  margin: 0;
`;

export const GoBackButton = styled.span`
  cursor: pointer;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
