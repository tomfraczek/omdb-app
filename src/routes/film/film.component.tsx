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

type Ratings = {
  Source: string;
  Value: string;
};

type Result = {
  Actors: string;
  Director: string;
  Genre: string;
  Plot: string;
  Poster: string;
  Ratings: Ratings[];
  Title: string;
  Type: string;
};

export const Film = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState<Result | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { filmId } = useParams<{ filmId: string }>();

  const fetchQueryData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?i=${filmId}&apikey=acd962bb`
      );
      console.log(response.data);

      setResult(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filmId) {
      fetchQueryData();
    }
  }, [filmId]);

  if (loading) {
    return <div>Loading...</div>;
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
