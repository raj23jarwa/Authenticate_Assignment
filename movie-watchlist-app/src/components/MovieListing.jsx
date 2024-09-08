import React from "react";
import { useSelector } from "react-redux";
import oops from '../assets/images/pnf.jpg'
import 'react-toastify/dist/ReactToastify.css';
import {Slide, ToastContainer, toast } from 'react-toastify';
import { getAllMovies, getAllShows } from "../features/movies/movieSlice";
import MovieCard from "./MovieCard";
// import "./MovieListing.scss";
const MovieListing = () => {
  const movies = useSelector(getAllMovies);
  const shows = useSelector(getAllShows);
  let renderMovies,
    renderShows = "";

  renderMovies =
    movies.Response === "True" ? (
      movies.Search.map((movie, index) => (
        <MovieCard key={index} data={movie} />
      ))
    ) : (
      <div className="movies-error flex items-center justify-center ">
        {/* <h3>{movies.Error}</h3> */}        
        <img src={oops} alt="oops" />
      </div>
    );

  renderShows =
    shows.Response === "True" ? (
      shows.Search.map((movie, index) => <MovieCard key={index} data={movie} />)
    ) : (
      <div className="shows-error  flex items-center justify-center">
        {/* <h3>{shows.Error}</h3> */}
        <img src={oops} alt="oops" />

      </div>
    );
  return (
    <div className="movie-wrapper">
       <ToastContainer
        autoClose={2000} // Set autoClose to 2000 milliseconds (2 seconds) 

        transition={Slide}

      />
      <div className="movie-list bg-gradient-to-b from-gray-800 to-black">
        <h2 className="text-2xl font-semibold text-white mb-4 p-4">Movies</h2>
        <div className=" px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 py-4">
          {renderMovies}
        </div>
      </div>
      <div className="show-list">
        <h2 className="text-2xl font-semibold text-white mb-4 p-4">Shows</h2>
        <div className=" px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 lg:grid-cols-4 ">
          {renderShows}
        </div>
      </div>
    </div>
  );
};

export default MovieListing;
