import React from "react";

const MovieSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 max-w-7xl mx-auto px-4 mt-15">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="w-64 h-96 bg-gray-700 rounded-lg animate-pulse">
          <div className="w-full h-4/5 bg-gray-600 rounded-t-lg"></div>
          <div className="p-4">
            <div className="h-4 bg-gray-600 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-600 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieSkeleton;