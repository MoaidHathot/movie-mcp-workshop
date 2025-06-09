import {
  Movie,
  MoviesSearchParams,
  Plot,
  ReturnType,
  SearchMovieResult,
  Type,
} from "./movies.js";

const MOVIES_API_BASE = "http://www.omdbapi.com";

async function makeMoviesRequest<T>(
  url: string,
  apiKey: string,
  queryParams?: URLSearchParams
): Promise<T | null> {
  try {
    const urlObj = new URL(url, MOVIES_API_BASE);

    // Add any additional query parameters
    if (queryParams) {
      queryParams.forEach((value, key) => {
        urlObj.searchParams.set(key, value);
      });
    }

    // Always add API token as query parameter
    urlObj.searchParams.set("apikey", apiKey);
    const finalUrl = urlObj.toString();

    const response = await fetch(finalUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    console.error("Error making Movies request:", error);
    return null;
  }
}

export async function getMovieById(
  apiKey: string,
  id: string,
  type?: Type,
  year?: number,
  plot: Plot = Plot.Short,
  returnType: ReturnType = ReturnType.Json
): Promise<Movie | null> {
  const mergedQueryParams = {
    i: id,
    plot: plot.toString(),
    r: returnType.toString(),
    ...(type ? { type: type.toString() } : {}),
    ...(year ? { y: year.toString() } : {}),
  };
  const queryParams = new URLSearchParams(mergedQueryParams);
  return makeMoviesRequest<Movie>(MOVIES_API_BASE, apiKey, queryParams);
}

export async function getMovieByName(
  apiKey: string,
  name: string,
  type?: Type,
  year?: number,
  plot: Plot = Plot.Short,
  returnType: ReturnType = ReturnType.Json
): Promise<Movie | null> {
  const mergedQueryParams = {
    t: name,
    plot: plot.toString(),
    r: returnType.toString(),
    ...(type ? { type: type.toString() } : {}),
    ...(year ? { y: year.toString() } : {}),
  };
  const queryParams = new URLSearchParams(mergedQueryParams);
  return makeMoviesRequest<any>(MOVIES_API_BASE, apiKey, queryParams);
}

export async function getSeasonByMovieId(
  apiKey: string,
  id: string,
  seasonNumber: number,
  type?: Type,
  year?: number,
  plot: Plot = Plot.Short,
  returnType: ReturnType = ReturnType.Json
): Promise<Movie | null> {
  const queryParams = new URLSearchParams({
    i: id,
    Season: seasonNumber.toString(),
    ...(type ? { type: type.toString() } : {}),
    ...(year ? { y: year.toString() } : {}),
    ...(plot ? { plot: plot.toString() } : {}),
    ...(returnType ? { r: returnType.toString() } : {}),
  });
  return makeMoviesRequest<Movie>(MOVIES_API_BASE, apiKey, queryParams);
}

export async function getSeasonByMovieName(
  apiKey: string,
  name: string,
  seasonNumber: number,
  type?: Type,
  year?: number,
  plot: Plot = Plot.Short,
  returnType: ReturnType = ReturnType.Json
): Promise<Movie | null> {
  const mergedQueryParams = {
    t: name,
    Season: seasonNumber.toString(),
    ...(type ? { type: type.toString() } : {}),
    ...(year ? { y: year.toString() } : {}),
    ...(plot ? { plot: plot.toString() } : {}),
    ...(returnType ? { r: returnType.toString() } : {}),
  };
  const queryParams = new URLSearchParams(mergedQueryParams);
  return makeMoviesRequest<Movie>(MOVIES_API_BASE, apiKey, queryParams);
}

export async function searchMovies(
  apiKey: string,
  query: string,
  type?: Type,
  year?: number,
  plot: Plot = Plot.Short,
  returnType: ReturnType = ReturnType.Json
): Promise<SearchMovieResult | null> {
  // Get first page to determine total results
  const mergedQueryParams = {
    s: query,
    page: "1",
    ...(type ? { type: type.toString() } : {}),
    ...(year ? { y: year.toString() } : {}),
    ...(plot ? { plot: plot.toString() } : {}),
    ...(returnType ? { r: returnType.toString() } : {}),
  };
  const queryParams = new URLSearchParams(mergedQueryParams);
  const firstPageResult = await makeMoviesRequest<SearchMovieResult>(
    MOVIES_API_BASE,
    apiKey,
    queryParams
  );

  if (!firstPageResult || firstPageResult.Response !== "True") {
    return firstPageResult;
  }

  const totalResults = parseInt(firstPageResult.totalResults);
  const resultsPerPage = 10; // OMDB returns 10 results per page
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  // If only one page, return the first result
  if (totalPages <= 1) {
    return firstPageResult;
  }

  // Fetch remaining pages
  const remainingPagePromises = [];
  for (let page = 2; page <= totalPages; page++) {
    const pageParams = new URLSearchParams({
      s: query,
      page: page.toString(),
      ...(type ? { type: type.toString() } : {}),
      ...(year ? { y: year.toString() } : {}),
      ...(plot ? { plot: plot.toString() } : {}),
      ...(returnType ? { r: returnType.toString() } : {}),
    });
    remainingPagePromises.push(
      makeMoviesRequest<SearchMovieResult>(MOVIES_API_BASE, apiKey, pageParams)
    );
  }

  const remainingPages = await Promise.all(remainingPagePromises);

  // Combine all results
  const allMovies = [...firstPageResult.Search];
  for (const pageResult of remainingPages) {
    if (pageResult && pageResult.Response === "True" && pageResult.Search) {
      allMovies.push(...pageResult.Search);
    }
  }

  return {
    Search: allMovies,
    totalResults: firstPageResult.totalResults,
    Response: "True",
  };
}
