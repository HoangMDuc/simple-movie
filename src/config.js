export const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const apiKey = "c0110f01f769eda642c2f45a09f41297";
const tmdbEndPoint = "https://api.themoviedb.org/3/movie";
export const tmdbApi = {
  getMoviesList(type, page = 1) {
    return `${tmdbEndPoint}/${type}?api_key=${apiKey}`;
  },
  getMovieDetails(movieId) {
    return `${tmdbEndPoint}/${movieId}?api_key=${apiKey}`;
  },
  getMovieSearch: (query, page) =>
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`,
  getMovieMeta(movieId, type) {
    return `${tmdbEndPoint}/${movieId}/${type}?api_key=${apiKey}`;
  },
  imageOriginal: (url) => `https://image.tmdb.org/t/p/original/${url}`,
};
