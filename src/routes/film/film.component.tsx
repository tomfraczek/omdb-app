import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Result } from "./film.types";
import { fetchQueryData } from "../../utils/helpers";
import { Spinner } from "../../components/spinner";

import {
  FilmContainer,
  Header,
  FilmTitle,
  ScoreContainer,
  RatingWrapper,
  ContentContainer,
  PosterImg,
  PosterContainer,
  DescriptionContainer,
  FilmPlot,
  Notification,
  ColumnContainer,
  Cast,
  SectionTitle,
  GoBackButton,
  HeaderContainer,
  Info,
  InfoContainer,
} from "./film.styles";

export const Film = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { filmId } = useParams<{ filmId: string }>();

  useEffect(() => {
    const fetchFilmData = async () => {
      setLoading(true);
      if (filmId) {
        const data = await fetchQueryData("", 1, undefined, undefined, filmId);
        setResult(data as Result | null);
      }
      setLoading(false);
    };

    fetchFilmData();
  }, [filmId]);

  if (loading) {
    return <Spinner />;
  }

  if (!result) {
    return <Notification>No data found.</Notification>;
  }

  const { Actors, Director, Genre, Plot, Title, Type, Ratings, Poster, Year } =
    result;

  return (
    <FilmContainer>
      <HeaderContainer>
        <GoBackButton onClick={() => navigate(-1)}>
          &#x2190; Go Back
        </GoBackButton>
        <Header>
          <FilmTitle>{Title}</FilmTitle>
          <InfoContainer>
            <Info>{Type},</Info>
            <Info>{Genre}</Info>
            <Info>- {Year}</Info>
          </InfoContainer>
        </Header>
      </HeaderContainer>

      <ContentContainer>
        <PosterContainer>
          <PosterImg src={Poster} />
        </PosterContainer>

        <DescriptionContainer>
          <ScoreContainer>
            {Ratings.map((rating, index) => (
              <RatingWrapper key={index}>
                <SectionTitle>{rating.Source}</SectionTitle>
                <Info>{rating.Value}</Info>
              </RatingWrapper>
            ))}
          </ScoreContainer>

          <ColumnContainer>
            <FilmPlot>{Plot}</FilmPlot>
          </ColumnContainer>

          <ColumnContainer>
            <SectionTitle>Cast & Crew</SectionTitle>
            <Cast>
              {Director}, {Actors}
            </Cast>
          </ColumnContainer>
        </DescriptionContainer>
      </ContentContainer>
    </FilmContainer>
  );
};
