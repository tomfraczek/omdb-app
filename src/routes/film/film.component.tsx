import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      <Header>
        <FilmTitle>{Title}</FilmTitle>
      </Header>

      <ContentContainer>
        <PosterContainer>
          <PosterImg src={Poster} />
        </PosterContainer>

        <DescriptionContainer>
          <ScoreContainer>
            {Ratings.map((rating, index) => (
              <RatingWrapper key={index}>
                <p>{rating.Source}</p>
                <p>{rating.Value}</p>
              </RatingWrapper>
            ))}
          </ScoreContainer>

          <FilmPlot>{Plot}</FilmPlot>

          <ColumnContainer>
            <p>Cast & Crew</p>
            <Cast>
              {Director}, {Actors}
            </Cast>
          </ColumnContainer>
        </DescriptionContainer>
      </ContentContainer>
    </FilmContainer>
  );
};
