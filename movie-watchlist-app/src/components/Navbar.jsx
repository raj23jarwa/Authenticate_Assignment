import React, { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa"; // Import all icons together
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { fetchAsyncMovies, fetchAsyncShows } from '../features/movies/movieSlice';
import 'react-toastify/dist/ReactToastify.css';
import { Slide, ToastContainer, toast } from 'react-toastify';
import logo from '../assets/images/logo.svg'

const Navbar = () => {
    const [term, setTerm] = useState("");
    const [nav, setNav] = useState(false);
    const [activeLink, setActiveLink] = useState(null);
    const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
    const dispatch = useDispatch();

    const handleSearchInputChange = (event) => {
        setTerm(event.target.value);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        if (term === "") return;
        setTerm("");
        dispatch(fetchAsyncMovies(term));
        dispatch(fetchAsyncShows(term));
    };

    const handleActive = (path) => {
        setActiveLink(path);
        setNav(false);
    };

    const links = [
        { id: 1, link: 'home', path: '/home' },
        { id: 2, link: 'Watchlist', path: '/watchlist' },
    ];

    return (
        <>
            <div className='flex justify-between items-center w-full h-20 bg-gray-900 text-white px-4 sticky top-0 z-20 shadow-lg'>
                    <div className="flex items-center">
                        <img src={logo} alt="Logo" className="w-10 h-10 mr-2" />
                        <h1 className="text-3xl font-bold tracking-wide">OMDB</h1>
                    </div>   

                    <form className="flex items-center max-w-xs md:max-w-sm w-full" onSubmit={submitHandler}>
                    <input
                        type="search"
                        placeholder="Search Movies..."
                        value={term}
                        onChange={handleSearchInputChange}
                        className="w-full p-2 rounded-l-lg bg-gray-800 text-gray-300 focus:outline-none"
                    />
                    <button type="submit" className="p-[0.80rem] bg-indigo-600 rounded-r-lg hover:bg-indigo-700">
                        <FaSearch className="text-white " />
                    </button>
                </form>

                <ul className='hidden md:flex items-center gap-7'>
                    {links.map(({ id, link, path }) => (
                        <li
                            key={id}
                            className={`font-medium text-lg capitalize hover:scale-105 transition-transform ${
                                activeLink === path ? 'text-indigo-400' : 'text-gray-300'
                            }`}
                            onClick={() => handleActive(path)}
                        >
                            <NavLink to={path} className="nav-link">{link}</NavLink>
                        </li>
                    ))}
                    {isAuthenticated && <p className="text-lg text-indigo-400">{user.name}</p>}
                    {isAuthenticated ? (
                        <li>
                            <button
                                className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700'
                                onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                            >
                                Log Out
                            </button>
                        </li>
                    ) : (
                        <li>
                            <button
                                className='bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700'
                                onClick={() => loginWithRedirect()}
                            >
                                Log In
                            </button>
                        </li>
                    )}
                </ul>

                <div onClick={() => setNav(!nav)} className='md:hidden cursor-pointer text-gray-300'>
                    {nav ? <FaTimes size={25} /> : <FaBars size={25} />}
                </div>

                {nav && (
                    <ul className='flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gray-900 text-gray-300'>
                        {links.map(({ id, link, path }) => (
                            <li
                                key={id}
                                className='px-4 py-6 font-medium capitalize hover:scale-105 transition-transform'
                                onClick={() => handleActive(path)}
                            >
                                <NavLink to={path} className="nav-link">{link}</NavLink>
                            </li>
                        ))}
                        <li>
                            {isAuthenticated && <p className="text-xl text-indigo-400">{user.name}</p>}
                            {isAuthenticated ? (
                                <button
                                    className='bg-indigo-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-indigo-700'
                                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                                >
                                    Log Out
                                </button>
                            ) : (
                                <button
                                    className='bg-indigo-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-indigo-700'
                                    onClick={() => loginWithRedirect()}
                                >
                                    Log In
                                </button>
                            )}
                        </li>
                    </ul>
                )}
            </div>

            <ToastContainer autoClose={2000} transition={Slide} />
        </>
    );
};

export default Navbar;
