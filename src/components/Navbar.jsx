import React, { useState, useEffect } from "react";

const Navbar = ({handleSearch, searchTerm, setSearchTerm, category, setCategory, setPage}) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

   useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm.trim()) {
      handleSearch();
    }
  }, [debouncedSearchTerm]);

  const handleCategoryClick = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
      setPage(1);
    }
  };

  return (
    <div className="navbar bg-base-100/80 shadow-sm justify-between fixed z-50 backdrop-blur-sm top-0">
      <div className="mr-2 flex-1">
        <a className="btn btn-ghost text-xl">BingeBox</a>
      </div>
      <div className="flex text-md font-semibold gap-2">
        <button className={`btn btn-ghost btn-sm ${category === "movie" ? "btn-active" : ""}`} onClick={() => handleCategoryClick("movie")}>
          Movies
        </button>
        <button className={`btn btn-ghost btn-sm ${category === "tv" ? "btn-active" : ""}`} onClick={() => handleCategoryClick("tv")}>
          Tv Series
        </button>
        <button className="btn btn-ghost btn-sm">Favourites</button>
      </div>
      <div className="flex max-w-md mx-4 ml-4">
        <input
          type="text"
          placeholder="Search movies and TV shows..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          className="input input-bordered w-24 md:w-80 transition-all duration-300"
        />
        <button 
          onClick={handleSearch}
          className="btn btn-primary ml-2"
          disabled={!searchTerm.trim()}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default Navbar;
