import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom"; // Use NavLink for active link highlighting
import { FaSearch } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer, toast } from 'react-toastify';
import user from "../assets/images/user.png";
import { useDispatch } from "react-redux";
import { fetchAsyncMovies, fetchAsyncShows } from '../features/movies/movieSlice'; // Import the action to set search value
// import { addToWatchlist } from '../features/movies/movieSlice'
import { User, useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
    const [term, setTerm] = useState("");
    const [nav, setNav] = useState(false);
    const [activeLink, setActiveLink] = useState(null);
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    
    const dispatch = useDispatch();
    // const history=useHistory();

    const handleSearchInputChange = (event) => {
        // event.preventDefault();
        setTerm(event.target.value);
        //     // console.log("term is :",term)
        // if (term === "") return ; //(toast.warning("Please Enter movies or shows"))
        //     // // history.push('/home')
        //     // dispatch(fetchAsyncMovies(term));
        //     // dispatch(fetchAsyncShows(term));
        //     // dispatch(addToWatchlist(term))
        //     console.log(event)
    };
    // useEffect(() => {
    //     const username=user.name;
    //     console.log("username is:" ,username);
    //     localStorage.setItem('username',username)
            
    // }, [user])
    

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(e)
        if (term === "") return;//(toast.warning("Please Enter movies or shows"));
        setTerm("");
        console.log("term --->", term);
        // history.push('/home')
        dispatch(fetchAsyncMovies(term));
        dispatch(fetchAsyncShows(term));
        // dispatch(addToWatchlist(term))

    };

    const handleActive = (path) => {
        setActiveLink(path); // Set the active link path
        setNav(false); // Close the mobile menu when a link is clickede
        // history.push(path); // Navigate programmatically using history.push


    };

    const links = [
        { id: 1, link: 'home', path: '/home',buttonText:'login' },
        { id: 2, link: 'Watchlist', path: '/watchlist',buttonText:'logout' },
    ];

    return (
        <>
            <div className='flex justify-between items-center w-full h-20 text-white bg-black sticky z-20 px-4 top-0'>
                <div>
                    <h1 className='font-signature text-4xl'>OMDB</h1>
                </div>

                <div className='flex gap-4  justify-center items-center' >
                    {/* Search Bar */}
                    <form className="max-w-md" onSubmit={submitHandler} >

                        <label htmlFor="default-search" className="sr-only"> Search </label>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Search Movies..."
                            required
                            onChange={handleSearchInputChange}
                        />

                    </form>


                </div>
                <ul className='hidden md:flex  gap-7'>
                    {links.map(({ id, link, path }) => (
                        <li
                            key={id}
                            className={`px-4 md:text-xl cursor-pointer font-medium text-gray-500 capitalize hover:scale-105 duration-200 ${activeLink === path ? 'border-b-2 border-white' : ''}`}
                            onClick={() => handleActive(path)} // Pass the link path to handleActive
                        >
                            <NavLink to={path}  className="nav-link">{link}</NavLink>

                        </li>
                        
                    ))}
                    {isAuthenticated && <p className="text-xl text-white">{user.name}</p>}
                    {isAuthenticated ? (
                        <li>
                        <button className=' hidden md:block bg-indigo-700 text-white px-4 py-2 ml-4 rounded-xl' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                            Log Out
                        </button>
                        </li>
                    ) : (
                        <li>
                        <button className=' hidden md:block bg-indigo-700 text-white px-4 py-2 ml-4 rounded-xl' onClick={() => loginWithRedirect()} >Log In </button>
                        </li>
                    )}

                   
                </ul>


                <div onClick={() => setNav(!nav)} className='cursor-pointer pr-4 z-10 text-gray-500 md:hidden'>
                    {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
                </div>

                {nav && (
                    <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800'>
                        {links.map(({ id, link, path }) => (
                            <li
                                key={id}
                                className='px-4 py-6 cursor-pointer font-medium capitalize hover:scale-105 duration-200'
                                onClick={() => handleActive(path)} // Pass the link path to handleActive
                            >
                                <NavLink to={path} exact className="nav-link" activeClassName="active">{link}</NavLink>
                            </li>
                        ))}
                        <li>
                            {isAuthenticated && <p className="text-xl text-white">{user.name}</p>}
                            {isAuthenticated ? (
                                <button className=' md:block bg-indigo-700 text-white px-4 py-2 ml-4 rounded-xl' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                                    Log Out
                                </button>
                            ) : (
                                <button className=' md:block bg-indigo-700 text-white px-4 py-2 ml-4 rounded-xl' onClick={() => loginWithRedirect()} >Log In </button>
                            )}
                        </li>
                    </ul>
                )}
            </div >
            <ToastContainer
                autoClose={2000} // Set autoClose to 2000 milliseconds (2 seconds) 

                transition={Slide}

            />
        </>
    );
};

export default Navbar;
