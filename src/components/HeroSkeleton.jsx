import React from "react";

const HeroSkeleton = () => {
  return (
    <div className="relative w-full h-96 overflow-hidden mt-14 mx-auto max-w-[calc(100%-48px)] rounded-lg bg-gray-700 animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"/>
      <div className="absolute bottom-8 left-9 text-white max-w-2xl">
        <div className="h-8 bg-gray-600 rounded w-64 mb-4"></div>
        <div className="h-4 bg-gray-600 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-600 rounded w-3/4"></div>
      </div>
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className="w-2 h-2 bg-gray-500 rounded-full"></div>
        ))}
      </div>
    </div>
  );
};

export default HeroSkeleton;