import React, { useState, useEffect } from 'react';

const RemoveFromWatchList = ({movieKey, handleRemoveFromWatchlist, }) => {
//   const [watchlist, setWatchlist] = useState([]);
const handleClick = () => {
    // Call the handleAddToWatchlist function with the movie as an argument
    handleRemoveFromWatchlist(movieKey);
  };

  return (
    <>
      {/* <div className='relative top-32 right-4 bg-white w-92 text-black flex flex-row justify-center items-center rounded-xl px-4 hover:bg-blue-500 hover:text-white'>
        <span className=' whitespace-nowrap' onClick={handleClick} >Remove From Watchlist ❌</span>
        
      </div> */}
      <button className=' whitespace-nowrap bg-white px-4 rounded-lg relative top-32 right-4' onClick={handleClick}> Remove From Watchlist ❌</button>
    </>
  );
};

export default RemoveFromWatchList;
