import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovieOrShowDetail,
  getSelectedMovieOrShow,
  removeSelectedMovieOrShow,
} from '../features/movies/movieSlice';

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovieOrShow);
  console.log(data);

  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);

  return (
    <div className="movie-section flex flex-col md:flex-row justify-center items-start p-10 text-white bg-gradient-to-b from-gray-800 to-black ">
      {Object.keys(data).length === 0 ? (
        <div className="text-2xl font-semibold animate-pulse">Loading...</div>
      ) : (
        <>
          <div className="section-left w-full md:w-1/2 pr-8">
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-300 mb-4">
              {data.Title}
            </h1>
            <div className="movie-rating grid grid-cols-2 gap-4 text-lg leading-6 mb-6">
              <span className="flex items-center">
                <i className="fa fa-star text-yellow-400 mr-2"></i>
                IMDB Rating: {data.imdbRating}
              </span>
              <span className="flex items-center">
                <i className="fa fa-thumbs-up text-green-400 mr-2"></i>
                IMDB Votes: {data.imdbVotes}
              </span>
              <span className="flex items-center">
                <i className="fa fa-film text-red-400 mr-2"></i>
                Runtime: {data.Runtime}
              </span>
              <span className="flex items-center">
                <i className="fa fa-calendar text-blue-400 mr-2"></i>
                Year: {data.Year}
              </span>
            </div>
            <p className="text-lg md:text-xl leading-7 mb-6 text-gray-300">
              {data.Plot}
            </p>
            <div className="movie-info text-lg leading-8 text-pink-400">
              <div className="mb-3">
                <span className="font-semibold">Director: </span>
                <span className="text-white">{data.Director}</span>
              </div>
              <div className="mb-3">
                <span className="font-semibold">Stars: </span>
                <span className="text-white">{data.Actors}</span>
              </div>
              <div className="mb-3">
                <span className="font-semibold">Genres: </span>
                <span className="text-white">{data.Genre}</span>
              </div>
              <div className="mb-3">
                <span className="font-semibold">Languages: </span>
                <span className="text-white">{data.Language}</span>
              </div>
              <div className="mb-3">
                <span className="font-semibold">Awards: </span>
                <span className="text-white">{data.Awards}</span>
              </div>
            </div>
          </div>
          <div className="section-right w-full md:w-1/2 flex justify-center items-center">
            <img
              src={data.Poster}
              alt={data.Title}
              className="w-80 md:w-96 rounded-lg shadow-lg"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
