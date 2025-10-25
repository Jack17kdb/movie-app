import React from "react";

const Modal = ({ selectedMovie, setSelectedMovie, getImageUrl }) => {
  return (
    <>
      <input
        type="checkbox"
        id="movie-modal"
        className="modal-toggle"
        checked={selectedMovie !== null}
        readOnly
      />
      <div className="modal" role="dialog">
        <div className="modal-box max-w-2xl p-0 overflow-hidden">
          <div className="relative">
            <img
              src={getImageUrl(selectedMovie?.backdrop_path, "w780")}
              alt={selectedMovie?.name || selectedMovie?.title}
              className="w-full h-48 object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-transparent" />
          </div>
          
          <div className="p-6">
            <div className="flex items-start gap-4">
              <img
                src={getImageUrl(selectedMovie?.poster_path, "w342")}
                alt={selectedMovie?.name || selectedMovie?.title}
                className="w-24 h-36 object-cover rounded-lg shadow-lg -mt-6 border-2 border-white"
              />
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white">
                  {selectedMovie?.title || selectedMovie?.name}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-300">
                  <span>⭐ {selectedMovie?.vote_average?.toFixed(1)}/10</span>
                  <span>•</span>
                  <span>{selectedMovie?.release_date || selectedMovie?.first_air_date}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-white mb-2">Overview</h4>
              <p className="text-gray-300 leading-relaxed line-clamp-3">
                {selectedMovie?.overview || "No overview available."}
              </p>
            </div>
            
            <div className="mt-4 flex gap-6 text-sm">
              <div>
                <span className="text-gray-400">Popularity: </span>
                <span className="text-white">{selectedMovie?.popularity?.toFixed(0)}</span>
              </div>
              <div>
                <span className="text-gray-400">Vote Count: </span>
                <span className="text-white">{selectedMovie?.vote_count}</span>
              </div>
            </div>
          </div>
          
          
        </div>
        

        <label 
          className="modal-backdrop" 
          htmlFor="movie-modal" 
          onClick={() => setSelectedMovie(null)}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default Modal;