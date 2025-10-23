import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm justify-between fixed">
      <div className="mr-2 flex-1">
        <a className="btn btn-ghost text-xl">BingeBox</a>
      </div>
      <div className="flex text-md font-semibold">
        <a className="btn btn-ghost btn-sm">Movies</a>
        <a className="btn btn-ghost btn-sm">Tv Series</a>
        <a className="btn btn-ghost btn-sm">Favourites</a>
      </div>
      <div className="flex max-w-md mx-4 ml-4">
        <input
          type="text"
          placeholder="Search"
          className="input input-bordered w-24 md:w-80"
        />
      </div>
    </div>
  );
};

export default Navbar;
