import MovieCard from "../components/MovieCard.jsx";
import { useState, useEffect } from "react";
import { searchMovies, getPopularMovies } from "../services/api.js";
import "../css/Home.css";

function Home() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch movies whenever page changes
  useEffect(() => {
    const loadPopularMovies = async () => {
      setLoading(true);
      try {
        const popularMovies = await getPopularMovies(page);
        setMovies((prev) => [...prev, ...popularMovies]); // append new movies
      } catch (err) {
        setError("Failed to fetch popular movies.");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, [page]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 50 >=
        document.documentElement.scrollHeight
      ) {
        setPage((prev) => prev + 1); // increase page
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    try {
      const searchResults = await searchMovies(searchTerm);
      setMovies(searchResults); // replace with search results
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed to search movie....");
    } finally {
      setLoading(false);
    }
    setSearchTerm("");
  };

  return (
    <div className="home">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {loading && <div className="loading">Loading...</div>}
    </div>
  );
}

export default Home;
