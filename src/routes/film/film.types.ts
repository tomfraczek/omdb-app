export type Ratings = {
  Source: string;
  Value: string;
};

export type Result = {
  Actors: string;
  Director: string;
  Genre: string;
  Plot: string;
  Poster: string;
  Ratings: Ratings[];
  Title: string;
  Type: string;
};
