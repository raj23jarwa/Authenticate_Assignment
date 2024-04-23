import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import MovieListing from "./MovieListing";
import { fetchAsyncMovies, fetchAsyncShows } from "../features/movies/movieSlice";
import { useLocation } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const movieNames = ["Harry Potter", "Star wars", "Rock", "Avatar", "365", "Iron", "Spider"];
  const [movieText, setMovieText] = useState("");
  const [showText, setShowText] = useState("");

  const getRandomMovieName = () => {
    const randomIndex = Math.floor(Math.random() * movieNames.length);
    return movieNames[randomIndex];
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const movieName = searchParams.get("movie");
    const showName = searchParams.get("show");

    if (movieName && showName) {
      setMovieText(movieName);
      setShowText(showName);
    } else {
      setMovieText(getRandomMovieName());
      setShowText(getRandomMovieName());
    }
  }, [location.search]);

  useEffect(() => {
    if (movieText && showText) {
      dispatch(fetchAsyncMovies(movieText));
      dispatch(fetchAsyncShows(showText));
    }
  }, [dispatch, movieText, showText]);
 
  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
