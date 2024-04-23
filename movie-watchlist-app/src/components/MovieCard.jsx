import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWatchlist } from "../features/movies/movieSlice";
// import WatchList from "./WatchList";
import noImage from '../assets/images/Noimage.png'
import { useState,useEffect } from "react";

const MovieCard = ({ data }) => {
  const dispatch = useDispatch();
  const [existingWatchlist, setExistingWatchlist] = useState(() => {
    // Initialize with data from local storage or an empty array if no data exists
    const storedWatchlist = localStorage.getItem("watchlist");
    return storedWatchlist ? JSON.parse(storedWatchlist) : [];
  });
console.log("data-->",data)
  useEffect(() => {
    // Update local storage whenever existingWatchlist changes
    localStorage.setItem("watchlist", JSON.stringify(existingWatchlist));
  }, [existingWatchlist]);

  const handleAddToWatchlist = (datatowatch) => {

    // Check if the movie is already in the watchlist
    const isAlreadyAdded = existingWatchlist.some((item) => item.imdbID === data.imdbID);
    if (isAlreadyAdded) {
      toast.warning("This movie is already in your watchlist!");
    } else {
      // If the movie is not already in the watchlist, add it
      setExistingWatchlist([...existingWatchlist, data]);
      dispatch(addToWatchlist(datatowatch));
      toast.success("Movie added to watchlist");


    }
  };
  return (
    <>

      <div className=" flex items-center justify-center flex-col bg-gray-500 hover:scale-110 transform transition duration-300 cursor-pointer">
        <Link to={`/movie/${data.imdbID}`}>
        <div className="h-72">
          {data.Poster !== "N/A" ? (
            <img src={data.Poster} alt={data.Title} className="w-full h-full object-cover" />
          ) : (
            <img src={noImage} alt="Image not available" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="p-5">
          <div className="text-white">
            <h4 className="text-lg font-semibold mb-2">{data.Title}</h4>
            <p className="text-gray-300">{data.Year}</p>
          </div>
        </div>
        </Link>
        <div className='relative bg-white w-full  text-black flex flex-row justify-center items-center rounded-xl px-4 hover:bg-blue-500 hover:text-white'
          onClick={() => handleAddToWatchlist(data)}>
          {/* Attach onClick event to span */}
          <span className='mr-2' >Add to Watchlist</span>
          <svg
            width='1em'
            height='1em'
            viewBox='0 0 16 16'
            className='bi bi-heart-fill'
            fill='red'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z'
            />
          </svg>
        </div>
        {/* <WatchList existingWatchlist={existingWatchlist} /> */}

      </div>
    </>
  );
};

export default MovieCard;
