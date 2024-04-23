import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Slide, ToastContainer, toast } from 'react-toastify';
import RemoveFromWatchList from './RemoveFromWatchList';
import { useSelector } from 'react-redux';
import { removeFromWatchlist } from "../features/movies/movieSlice";
import { useEffect } from 'react';
import { getAllWatchlist } from '../features/movies/movieSlice';
import { useDispatch } from 'react-redux';

const WatchList = () => {
    const dispatch = useDispatch();
    const watchlistedMovies = useSelector(getAllWatchlist);
    console.log("watchlisted movieS:", watchlistedMovies);

    const handleRemoveFromWatchlist = (movieKey, event) => {
        event.stopPropagation(); // Prevents event from bubbling up to the Link
        dispatch(removeFromWatchlist(movieKey));
        toast.success("Movie Removed from Watchlist");
    }

    useEffect(() => {
        // Save watchlist to local storage whenever it changes
        localStorage.setItem("watchlist", JSON.stringify(watchlistedMovies));
    }, [watchlistedMovies]);

    return (
        <>
            <div className='z-10 w-full'>
                <h1 className='text-3xl text-white p-4'>Watchlist</h1>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 px-4">
                    {watchlistedMovies.length === 0 ? (
                        <div className="text-white">Your watchlist is empty.</div>
                    ) : (
                        watchlistedMovies.map((movie, index) => (
                            <Link to={`/movie/${movie.imdbID}`} key={index} className='relative transition-transform hover:scale-110 cursor-pointer'>
                                <img src={movie.Poster} alt='movie' className='w-64 h-72' />
                                <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 opacity-0 hover:opacity-100 transition-opacity'>
                                    <RemoveFromWatchList
                                        movieKey={movie.imdbID}
                                        handleRemoveFromWatchlist={(movieKey, event) => handleRemoveFromWatchlist(movieKey, event)}
                                    />
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
            <div className="movie-wrapper">
                <ToastContainer
                    autoClose={2000}
                    transition={Slide}
                />
            </div>
        </>
    );
};

export default WatchList;
