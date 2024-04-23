import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAsyncMovieOrShowDetail,
  getSelectedMovieOrShow,
  removeSelectedMovieOrShow,
} from '../features/movies/movieSlice'

const MovieDetail = () => {
  const { imdbID } = useParams();
  const dispatch = useDispatch();
  const data = useSelector(getSelectedMovieOrShow);
//   console.log(data);
  useEffect(() => {
    dispatch(fetchAsyncMovieOrShowDetail(imdbID));
    return () => {
      dispatch(removeSelectedMovieOrShow());
    };
  }, [dispatch, imdbID]);
  return (
    <div className="movie-section flex justify-evenly p-[40px][0px] text-white font-bold">
      {Object.keys(data).length === 0 ? (
        <div className="text-lg">Loading...</div>
      ) : (
        <>
          <div className="section-left w-1/2 ">
            <div className=" text-sm md:text-md movie-title text-[20px] text-blue-300">{data.Title}</div>
            <div className="movie-rating pl-[3px] mt-[20px] text-blue-300 grid grid-col-2 text-sm md:text-md leading-6">
              <span className="mr-[20px] white">
                IMDB Rating <i className="fa fa-star"></i> : {data.imdbRating}
              </span>
              <span className="mr-[20px]">
                IMDB Votes <i className="fa fa-thumbs-up"></i> :{" "}
                {data.imdbVotes}
              </span>
              <span className="mr-[20px]">
                Runtime <i className="fa fa-film"></i> : {data.Runtime}
              </span>
              <span className="mr-[20px]">
                Year <i className="fa fa-calendar"></i> : {data.Year}
              </span>
            </div>
            <div className=" text-sm md:text-md movie-plot mt-[20px] leading-6">{data.Plot}</div>
            <div className="movie-info mt-5 flex flex-col text-pink-400 leading-8 text-sm md:text-md">
              <div className="flex flex-row">
                <span className="mr-[20px]">Director :</span>
                <span className="mr-[20px] text-white">{data.Director}</span>
              </div>
              <div className="flex flex-row">
                <span className="mr-[20px]">Stars:</span>
                <span className="mr-[20px] text-white">{data.Actors}</span>
              </div>
              <div className="flex flex-row">
                <span className="mr-[20px]"> Generes :</span>
                <span className="mr-[20px] text-white">{data.Genre}</span>
              </div>
              <div className="flex flex-row">
                <span className="mr-[20px]">Languages:</span>
                <span className="mr-[20px] text-white">{data.Language}</span>
              </div>
              <div className="flex flex-row">
                <span className="mr-[20px]">Awards:</span>
                <span className="mr-[20px] text-white" >{data.Awards}</span>
              </div>
            </div>
          </div>
          <div className="section-right flex flex-col md:justify-center md:items-center">
            <img src={data.Poster} alt={data.Title} className="w-72 md:w-full" />
          </div>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
