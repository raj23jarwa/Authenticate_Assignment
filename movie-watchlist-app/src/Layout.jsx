import React from 'react'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
// import Home from './components/Home'
// import MovieList from './components/MovieList'
// import WatchList from './components/WatchList'
const Layout = () => {
  return (
    <div>
        <Navbar/>
        {/* <Home/> */}
        {/* <MovieList/> */}
        {/* <WatchList/> */}
        <Outlet/>
    </div>
  )
}

export default Layout