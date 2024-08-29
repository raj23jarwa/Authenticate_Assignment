import React from 'react';
import { UilTrashAlt } from '@iconscout/react-unicons';

const RemoveFromWatchList = ({ movieKey, handleRemoveFromWatchlist }) => {
  const handleClick = () => {
    handleRemoveFromWatchlist(movieKey);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        className="bg-white text-red-500 p-2 rounded-full shadow-md hover:bg-red-500 hover:text-white hover:scale-110 transition-transform duration-200 ease-in-out"
        onClick={handleClick}
        title="Remove from Watchlist"
      >
        <UilTrashAlt size="1.5rem" />
      </button>
    </div>
  );
};

export default RemoveFromWatchList;
