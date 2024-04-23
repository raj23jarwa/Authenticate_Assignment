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

    const handleRemoveFromWatchlist = (movieKey) => {
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
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-5 px-4">
                    {watchlistedMovies.length === 0 ? (
                        <div className="text-white">Your watchlist is empty.</div>
                    ) : (
                        watchlistedMovies.map((movie, index) => (
                            <div key={index} className='relative transition-transform hover:scale-110 cursor-pointer'>
                               <div className='relative  flex items-center justify-center bg-black bg-opacity-70 opacity-100  transition-opacity'>
                                 <div className='bg-gray-500'>
                                <Link to={`/movie/${movie.imdbID}`}>
                                    <img src={movie.Poster} alt='movie' className='w-64 h-72' />
                                </Link>
                                </div>
                                </div>
                                     <RemoveFromWatchList
                                        movieKey={movie.imdbID}
                                        handleRemoveFromWatchlist={handleRemoveFromWatchlist}
                                    /> 
                                    
                                          {/* <button className=' whitespace-nowrap bg-white px-4 rounded-lg relative  hover:bg-blue-500 hover:text-white' onClick={handleRemoveFromWatchlist}> Remove From Watchlist ❌</button> */}

                               
                            </div>
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
