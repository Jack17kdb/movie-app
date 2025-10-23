import React from "react";
import axios from 'axios';
import { useState, useEffect } from 'react'
import Card from "../components/Card"

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [category, setCategory] = useState("movie");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totaResults, setTotalResults] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("Gen V");

  useEffect(() => {
    handleCategoryChange();
  }, [category]);

  const handleSearch = async () => {
    try {
      setPage(1);
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
      setTotalResults(response.data.total_results);
    } catch (error) {
      console.log("error fetching data", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = async () => {
    try {
      setPage(1);
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
      setTotalResults(response.data.total_results);
    } catch (error) {
      console.log("error fetching data", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-6">
        <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto px-4 mt-10">
            {movies?.length > 0 ? 
                movies.map((movie, key) => (
                    <Card key={key} movie={movie} />
                ))
            : <></>}
        </div>
    </div>
  )
};

export default Home;
