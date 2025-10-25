import React from "react";
import axios from "axios";
import { FaCircle, FaRegCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Pagination from "../components/Pagination";
import HeroSkeleton from "../components/HeroSkeleton";
import MovieSkeleton from "../components/MovieSkeleton";
import ErrorDisplay from "../components/ErrorDisplay";
import MoviesError from "../components/MoviesError";
import Modal from "../components/Modal";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [latest, setLatest] = useState([]);
  const [currentLatest, setCurrentLatest] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [category, setCategory] = useState("movie");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    getLatest();
    handleCategoryChange();
    setSelectedMovie(null);
  }, []);

  useEffect(() => {
    if (isSearching) {
      handleSearch();
    } else {
      handleCategoryChange();
    }
  }, [category, page]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setIsSearching(false);
      setPage(1);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (latest.length > 0) {
      setCurrentLatest(latest[0]);
      setCurrentIndex(0);
    }
  }, [latest]);

  useEffect(() => {
    if (latest.length > 0) {
      const interval = setInterval(() => {
        if (currentIndex === latest.length - 1) {
          setCurrentIndex(0);
          setCurrentLatest(latest[0]);
        } else {
          setCurrentIndex(currentIndex + 1);
          setCurrentLatest(latest[currentIndex + 1]);
        }
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [latest, latest.length, currentIndex]);

  const getLatest = async () => {
    try {
      setLatest([]);
      setLoading(true);
      setError(null);
      const url = `${import.meta.env.VITE_BASE_URL}tv/popular?api_key=${
        import.meta.env.VITE_TMDB_API_KEY
      }`;
      const response = await axios.get(url);
      const latestSeries = response.data.results.slice(0, 7);
      console.log(latestSeries);
      setLatest(latestSeries);
    } catch (error) {
      console.log("error fetching data", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setIsSearching(false);
      return;
    }
    try {
      setIsSearching(true);
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}search/multi?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${searchTerm}&page=${page}`
      );
      console.log(response.data);
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log("error fetching data", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async () => {
    try {
      setIsSearching(false);
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}${category}/popular?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&page=${page}`
      );
      console.log(response.data);
      setMovies(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.log("error fetching data", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (path, size = "w1280") => {
    if (!path) return "/download.jpeg";
    return `https://image.tmdb.org/t/p/${size}${path}`;
  };

  const handleDotClick = (idx) => {
    setCurrentIndex(idx);
    setCurrentLatest(latest[idx]);
  };

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="min-h-screen py-6">
      <Navbar
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        setPage={setPage}
      />

      {error && <ErrorDisplay error={error} />}

      {loading && latest.length === 0 ? (
        <HeroSkeleton />
      ) : (
        <div className="relative w-screen h-96 overflow-hidden mt-14 z-0 mx-auto max-w-[calc(100%-48px)] rounded-lg">
          {currentLatest && (
            <div className="flex flex-col justify-center items-center">
              <div>
                <img
                  src={getImageUrl(currentLatest.backdrop_path)}
                  alt={currentLatest.name || "Latest series"}
                  className="w-full h-auto object-cover container mx-auto"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                <div className="absolute bottom-8 left-9 text-white">
                  <h2 className="text-4xl font-bold">
                    {currentLatest.name || currentLatest.title}
                  </h2>
                  <p className="text-lg mt-2 line-clamp-2">
                    {currentLatest.overview}
                  </p>
                </div>
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20 cursor-pointer">
                  {latest.map((_, index) =>
                    index === currentIndex ? (
                      <FaCircle
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className="text-white opacity-70"
                        size={10}
                      />
                    ) : (
                      <FaRegCircle
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className="text-white opacity-70"
                        size={10}
                      />
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {loading ? (
        <MovieSkeleton />
      ) : error ? (
        <MoviesError />
      ) : (
        <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto px-4 mt-15">
          {movies?.length > 0 ? (
            movies.map((movie, key) => (
              <Card
                key={key}
                movie={movie}
                onClick={() => handleSelectMovie(movie)}
              />
            ))
          ) : (
            <div className="text-lg text-gray-300 text-center w-full">
              No results found
            </div>
          )}
        </div>
      )}

      {selectedMovie && (
        <Modal
          selectedMovie={selectedMovie}
          setSelectedMovie={setSelectedMovie}
          getImageUrl={getImageUrl}
        />
      )}

      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        className=""
      />
    </div>
  );
};

export default Home;
