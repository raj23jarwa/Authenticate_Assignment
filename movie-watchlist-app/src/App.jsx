import React, { useState, useEffect } from 'react';
// import 'react-toastify/dist/ReactToastify.css';
// import {Slide, ToastContainer, toast } from 'react-toastify';

import './App.css';
import Home from './components/Home';
import MovieListing from './components/MovieListing';
import Navbar from './components/Navbar';
import WatchList from './components/WatchList'; // Step 1: Import the WatchList component

function App() {
  const apiKey = import.meta.env.VITE_API;

  const [movies, setMovies] = useState([]);
  // const [searchValue, setSearchValue] = useState('');
  // const [watchlist, setWatchlist] = useState([]); // Step 2: Create state for the watchlist
  // const [newWatchlist, setNewWatchlist] = useState([]);

  // const getMovieRequest = async (searchValue) => {
  //   if (!searchValue.trim()) {
  //     setMovies([])
  //     return;
  //   }
  //   const url = `https://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}&s=${searchValue}`;
  //   const response = await fetch(url);
  //   const responseJson = await response.json();
  //   if (responseJson.Search) {
  //     setMovies(responseJson.Search);
  //   }
  // };

  // useEffect(() => {
  //   getMovieRequest(searchValue);
  // }, [searchValue]);

  // useEffect(() => {
  //   const storedWatchlist = JSON.parse(localStorage.getItem('react-movie-app-favourites'));
  //   if (storedWatchlist) {
  //     setWatchlist(storedWatchlist);
  //     setNewWatchlist(storedWatchlist); // Initialize newWatchlist with stored value
  //   }
  // }, []);

  // const saveToLocalStorage = (items) => {
  //   localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  // };



  // // Function to add movie to watchlist
  // const handleAddToWatchlist = (movie) => {
  //   // Check if the movie is already in the watchlist
  //   const isAlreadyAdded = newWatchlist.some((item) => item.imdbID === movie.imdbID);
  //   if (isAlreadyAdded) {
  //     // If the movie is already in the watchlist, display a toast message and return early
  //     toast.warning("This movie is already in your watchlist!");
  //     return;
  //   }

  //   // Update the watchlist state to include the new movie
  //   setWatchlist((prevWatchlist) => {
  //     const newWatchlist = [...prevWatchlist, movie];
  //     saveToLocalStorage(newWatchlist);

  //     console.log("Watchlist after adding:", newWatchlist);
  //     return newWatchlist;
  //   });

  //   // Update the new watchlist state
  //   setNewWatchlist((prevNewWatchlist) => {
  //     const newWatchlist = [...prevNewWatchlist, movie];
  //     return newWatchlist;
  //   });
  //   toast.success("Added to Watchlist !");
  // };
  // console.log("watchlist is:---->", newWatchlist)


  // // Function to remove movie from watchlist
  // const handleRemoveFromWatchlist = (movieKey) => {
  //   // Update the watchlist state by removing the movie with the provided key
  //   setWatchlist((prevWatchlist) => {
  //     const updatedWatchlist = prevWatchlist.filter(movie => movie.imdbID !== movieKey);
  //     saveToLocalStorage(updatedWatchlist); // Save updated watchlist to local storage
  //     console.log("Watchlist after removing:", updatedWatchlist);
  //     return updatedWatchlist;
  //   });

  //   // Update the new watchlist state (if needed)
  //   setNewWatchlist((prevNewWatchlist) => prevNewWatchlist.filter(movie => movie.imdbID !== movieKey));
  //   toast.success("Removed from Watchlist !")
  // };


  return (
    <>
      <div className='flex flex-col gap-6'>
      <Navbar /> {/* Pass searchValue and setSearchValue as props */}
        {/* <Home  />  */}
        {/* Pass searchValue and setSearchValue as props */}
        {/* <WatchList/> */}
        {/* <MovieListing searchValue={searchValue} /> */}

        {/* <MovieListing movies={movies} watchlist={newWatchlist} handleAddToWatchlist={handleAddToWatchlist} /> */}
        {/* {searchValue == '' &&
          <WatchList heading='Watchlist' watchlist={newWatchlist} movies={movies} handleAddToWatchlist={handleAddToWatchlist} handleRemoveFromWatchlist={handleRemoveFromWatchlist} />
        } */}

      </div>
      <ToastContainer autoClose={2000} transition={Slide}/>

    </>
  );
}

export default App;
