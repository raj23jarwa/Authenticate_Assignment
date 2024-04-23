import React, { useState, useEffect } from 'react';
import { UilTrashAlt } from '@iconscout/react-unicons'

const RemoveFromWatchList = ({movieKey, handleRemoveFromWatchlist, }) => {
//   const [watchlist, setWatchlist] = useState([]);
const handleClick = () => {
    // Call the handleAddToWatchlist function with the movie as an argument
    handleRemoveFromWatchlist(movieKey);
  };

  return (
    <>
     <div className='flex flex-col justify-center items-center'>
      <button className='top-[-20px] whitespace-nowrap bg-white px-4 rounded-lg relative  hover:white hover:text-red-500' onClick={handleClick}> < UilTrashAlt/>
</button>
</div>
    </>
  );
};

export default RemoveFromWatchList;
