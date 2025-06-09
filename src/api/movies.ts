export interface MovieRating {
  Source: string;
  Value: string;
}

export interface Movie {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: string;
}

export interface SearchMovieResult {
  Search: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }[];
  totalResults: string;
  Response: string;
}

export enum Plot {
  Short = "Short",
  Full = "Full",
}

export enum Type {
  Unknown = -1,
  Movie,
  Series,
  Episode,
}

export enum ReturnType {
  Json = "Json",
  Xml = "Xml",
}

export interface EpisodeInfo {
  Title: string;
  Released: string;
  Episode: string;
  imdbRating: string;
  imdbID: string;
}

export type MoviesSearchParams = {
  plot?: Plot;
  type?: Type;
  returnType?: ReturnType;
  year?: number;
};
