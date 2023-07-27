
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

export const getMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/3/movie/popular`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Error fetching movies: " + error.message);
  }
};

export const getGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/3/genre/movie/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Error fetching genres: " + error.message);
  }
};

export const getMoviesByGenre = async (genreId) => {
  try {
    let url = `${BASE_URL}/3/movie/popular`;
    if (genreId) {
      url = `${BASE_URL}/3/discover/movie?with_genres=${genreId}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error("Error fetching movies: " + error.message);
  }
};
