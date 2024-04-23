import React, { useState, useEffect } from 'react';


import './App.css';
import Navbar from './components/Navbar';

function App() {  

  return (
    <>
      <div className='flex flex-col gap-6'>
      <Navbar /> 
       
      </div>
      <ToastContainer autoClose={2000} transition={Slide}/>

    </>
  );
}

export default App;
