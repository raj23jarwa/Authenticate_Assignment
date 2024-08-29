import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import RemoveFromWatchList from './RemoveFromWatchList';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWatchlist, getAllWatchlist } from '../features/movies/movieSlice';

const WatchList = () => {
  const dispatch = useDispatch();
  const watchlistedMovies = useSelector(getAllWatchlist);

  const handleRemoveFromWatchlist = (movieKey) => {
    dispatch(removeFromWatchlist(movieKey));
    toast.success("Movie Removed from Watchlist");
  };

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlistedMovies));
  }, [watchlistedMovies]);

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-gray-800 to-black text-white p-6">
        <h1 className="text-4xl font-bold mb-6">Your Watchlist</h1>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {watchlistedMovies.length === 0 ? (
            <div className="col-span-full text-center text-xl">
              Your watchlist is empty.
            </div>
          ) : (
            watchlistedMovies.map((movie, index) => (
              <div
                key={index}
                className="relative transition-transform transform hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-700 hover:bg-gray-600">
                  <Link to={`/movie/${movie.imdbID}`}>
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full h-80 object-cover rounded-t-lg"
                    />
                  </Link>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold mb-2">{movie.Title}</h3>
                      <RemoveFromWatchList
                        movieKey={movie.imdbID}
                        handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <ToastContainer autoClose={2000} transition={Slide} />
    </>
  );
};

export default WatchList;
