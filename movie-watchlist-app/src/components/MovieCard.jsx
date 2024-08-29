import React, { useState, useEffect } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWatchlist } from "../features/movies/movieSlice";
import noImage from '../assets/images/Noimage.png';

const MovieCard = ({ data }) => {
  const dispatch = useDispatch();
  const [existingWatchlist, setExistingWatchlist] = useState(() => {
    const storedWatchlist = localStorage.getItem("watchlist");
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(existingWatchlist));
  }, [existingWatchlist]);

  const handleAddToWatchlist = (datatowatch) => {
    const isAlreadyAdded = existingWatchlist.some((item) => item.imdbID === data.imdbID);
    if (isAlreadyAdded) {
      toast.warning("This movie is already in your watchlist!");
    } else {
      setExistingWatchlist([...existingWatchlist, data]);
      dispatch(addToWatchlist(datatowatch));
      toast.success("Movie added to watchlist");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center flex-col bg-gray-800 rounded-lg overflow-hidden transform transition duration-300 ease-in-out hover:scale-105 shadow-lg hover:shadow-2xl cursor-pointer">
        <Link to={`/movie/${data.imdbID}`}>
          <div className="h-72 w-full">
            {data.Poster !== "N/A" ? (
              <img
                src={data.Poster}
                alt={data.Title}
                className="w-full h-full object-cover rounded-t-lg"
              />
            ) : (
              <img
                src={noImage}
                alt="Image not available"
                className="w-full h-full object-cover rounded-t-lg"
              />
            )}
          </div>
          <div className="p-5 text-center">
            <div className="text-white">
              <h4 className="text-xl font-bold mb-2">{data.Title}</h4>
              <p className="text-gray-400">{data.Year}</p>
            </div>
          </div>
        </Link>
        <div
          className="relative bg-indigo-500 w-full text-white flex flex-row justify-center items-center rounded-b-lg px-4 py-2 hover:bg-indigo-600 transition-all duration-200 ease-in-out"
          onClick={() => handleAddToWatchlist(data)}
        >
          <span className="mr-2 font-semibold">Add to Watchlist</span>
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 16 16"
            className="bi bi-heart-fill text-red-500"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default MovieCard;
