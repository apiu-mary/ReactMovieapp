

import React, { useState, useEffect, useRef } from "react";
import { getMoviesByGenre, getGenres } from "../../utils/utilities";
import { Link } from "react-router-dom"; // Import Link for navigation
import "./style.css";
import SearchBar from "../search";

const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const navigationBarRef = useRef(null);

  useEffect(() => {
    fetchMovies();
    fetchGenres();

    // Automatically scroll to the right after 10 seconds
    const scrollInterval = setInterval(() => {
      if (navigationBarRef.current) {
        navigationBarRef.current.scrollLeft += 200; // Adjust the scroll speed as needed
      }
    }, 10000); // 10000 milliseconds = 10 seconds

    // Clear the interval when the component is unmounted or if the genres change
    return () => clearInterval(scrollInterval);
  }, [genres]);

  const fetchMovies = async (genreId) => {
    try {
      const fetchedMovies = await getMoviesByGenre(genreId);
      setMovies(fetchedMovies.results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error.message);
      setLoading(false);
    }
  };

  const fetchGenres = async () => {
    try {
      const fetchedGenres = await getGenres();
      setGenres(fetchedGenres.genres);
    } catch (error) {
      console.error("Error fetching genres:", error.message);
    }
  };

  const handleSearchFunction = async (searchValue) => {
    setLoading(true);
    if (!searchValue.trim()) {
      fetchMovies(selectedGenre);
    } else {
      try {
        const response = await fetch(
          `${BASE_URL}/3/search/movie?query=${searchValue}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        const result = await response.json();
        setMovies(result.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
        setLoading(false);
      }
    }
  };

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
    fetchMovies(genreId);
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <SearchBar onSearch={handleSearchFunction} />
      <div className="navigation-bar" ref={navigationBarRef}>
        <span
          className={!selectedGenre ? "active" : ""}
          onClick={() => handleGenreClick("")}
        >
          All Genres
        </span>
        {genres.map((genre) => (
          <span
            key={genre.id}
            className={selectedGenre === genre.id ? "active" : ""}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </span>
        ))}
      </div>
      <div className="image-container">
        {movies && movies.length > 0 && movies.map((item) => (
          <Link
            key={item.id}
            to={`/movies/${item.id}`} // This will navigate to the movie details page
            className="images"
          >
            <img src={`${IMAGE_BASE_URL}${item.poster_path}`} alt={item.title} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
