import React from "react";

const Card = ({ movie, onClick }) => {
  const posterUrl = `${import.meta.env.VITE_IMAGE_URL}/w500${
    movie.poster_path
  }`;
  return (
    <div
      className="flex flex-col justify-center items-center w-45 h-65 mb-15 gap-4 mt-6 cursor-pointer hover:scale-120 transition-all duration-400 ease-in-out"
      onClick={onClick}
    >
      <div className="w-full">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-40 h-60 object-cover rounded-lg"
        />
      </div>
      <div>
        <h2 className="text-sm text-white font-semibold text-center">
          {movie.title || movie.name}
        </h2>
        <p className="text-sm text-gray-300 text-center">
          {movie.release_date || movie.first_air_date}
        </p>
      </div>
    </div>
  );
};

export default Card;
