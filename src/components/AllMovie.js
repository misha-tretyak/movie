import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Movie from './Movie';
import Logo from '../tv.svg';

const MOVIES_API = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=96aa09220754ff3d7e85f718424d9995&page=1';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?&api_key=96aa09220754ff3d7e85f718424d9995&query=';

const AllMovie = (props) => {
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios
        .get(MOVIES_API)
        .then((res) => setMovies(res.data.results));
    }, []);

    const searchMovie = (e) => {
        e.preventDefault();

        if (searchQuery) {
            axios
            .get(SEARCH_API + searchQuery)
            .then((res) => setMovies(res.data.results));
        } else {
            axios
            .get(MOVIES_API)
            .then((res) => setMovies(res.data.results));
        }
    }

    const changeQuery = (e) => {
        setSearchQuery(e.target.value);        
    }

    return (
        <>
            <div className="w-full h-full">
                <div className="flex flex-no-wrap">
                    {/* Sidebar start */}
                    <div className="w-60 absolute lg:relative bg-white shadow flex-col justify-between hidden lg:flex pb-12">
                        <div className="px-8">
                            <div className="h-16 w-full flex items-center">
                                <img alt='logo' className="h-12 w-12 mt-1" src={Logo}></img>
                                Movie TV
                            </div>
                            <ul className="mt-2">
                                <Link to={'/'}>
                                    <li className="flex w-full justify-between text-indigo-700 cursor-pointer items-center mb-6">
                                        <div className="flex items-center">
                                            <span className="text-sm">All Movie</span>
                                        </div>
                                    </li>
                                </Link>
                                <Link to={'/favorite'}>
                                    <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                                        <div className="flex items-center">
                                            <span className="text-sm">Favorite Movie</span>
                                        </div>
                                    </li>
                                </Link>
                            </ul>
                        </div>
                    </div>

                    {/*Mobile responsive sidebar*/}
                    <div className={show ? "w-full h-full absolute z-40  transform  translate-x-0 " : "   w-full h-full absolute z-40  transform -translate-x-full"}>
                        <div className="bg-gray-800 opacity-50 w-full h-full absolute" onClick={() => setShow(!show)}></div>
                        <div className="w-60 md:w-96 absolute z-40 bg-white shadow h-full flex-col justify-between lg:hidden pb-4 transition duration-150 ease-in-out">
                            <div className="flex flex-col justify-between h-full">
                                <div>
                                    <div className="flex items-center justify-between px-8">
                                        <div className="h-16 w-full flex items-center">
                                            <img alt='logo' className="h-12 w-12 mt-1" src={Logo}></img>
                                            Movie TV
                                        </div>
                                        <div id="closeSideBar" className="flex items-center justify-center h-10 w-10" onClick={() => setShow(!show)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <line x1={18} y1={6} x2={6} y2={18} />
                                                <line x1={6} y1={6} x2={18} y2={18} />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="px-8">
                                        <ul className="mt-2">
                                            <Link to={'/'}>
                                                <li className="flex w-full justify-between text-indigo-700 cursor-pointer items-center mb-6">
                                                    <div className="flex items-center">
                                                        <span className="text-sm">All Movie</span>
                                                    </div>
                                                </li>
                                            </Link>
                                            <Link to={'/favorite'}>
                                                <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                                                    <div className="flex items-center">
                                                        <span className="text-sm">Favorite Movie</span>
                                                    </div>
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Mobile responsive sidebar*/}
                    {/* Sidebar end */}
                    <div className="w-full">
                        {/* Navigation start */}
                        <nav className="h-16 flex items-center lg:items-stretch justify-end lg:justify-between bg-white shadow relative z-0">
                            <div className="lg:flex w-full pr-2">
                                <div className="w-full h-full lg:flex items-center pl-6 pr-24">
                                    <div className="relative w-full">
                                        <div className="text-gray-500 absolute ml-4 inset-0 m-auto w-4 h-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" />
                                                <circle cx={10} cy={10} r={7} />
                                                <line x1={21} y1={21} x2={15} y2={15} />
                                            </svg>
                                        </div>
                                        <form onSubmit={searchMovie}>
                                            <input value={searchQuery} onChange={changeQuery} className="border border-gray-100 focus:outline-none focus:border-indigo-700 rounded w-full text-sm text-gray-500 bg-gray-100 pl-12 py-2" type="text" placeholder="Search" />
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="text-gray-600 mr-8 visible lg:hidden relative" onClick={() => setShow(!show)} id="menu">
                                {show ? (
                                    ""
                                ) : (
                                    <svg aria-label="Main Menu" aria-haspopup="true" xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-menu cursor-pointer" width={30} height={30} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" />
                                        <line x1={4} y1={8} x2={20} y2={8} />
                                        <line x1={4} y1={16} x2={20} y2={16} />
                                    </svg>
                                )}
                            </div>
                        </nav>
                        {/* Navigation end */}

                        {/* Content */}
                        <div className="grid lg:grid-cols-6 sm:grid-cols-2 md:grid-cols-3 justify-center flex">
                            {movies.length ? movies.map((movie) => {
                            return  <Movie key={movie.id} {...movie} />
                            }) : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AllMovie;


