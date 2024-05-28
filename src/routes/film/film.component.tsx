import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
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
  ColumnContainer,
  Cast,
  SectionTitle,
  GoBackButton,
  HeaderContainer,
  Info,
  InfoContainer,
} from "./film.styles";
import { Result } from "./film.types";
import { fetchQueryData } from "../../utils/helpers";
import { Spinner } from "../../components/spinner";

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
    return <div>No data found.</div>;
  }

  const { Actors, Director, Genre, Plot, Title, Type, Ratings, Poster } =
    result;

  return (
    <FilmContainer>
      <HeaderContainer>
        <Header>
          <FilmTitle>{Title}</FilmTitle>
          <InfoContainer>
            <Info>{Type},</Info>
            <Info>{Genre}</Info>
          </InfoContainer>
        </Header>
        <GoBackButton onClick={() => navigate(-1)}>Go Back</GoBackButton>
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
