import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';
import Logo from '../tv.svg';

const IMAGE_API = 'https://image.tmdb.org/t/p/w1280';

const MovieDetail = ({poster_path, title, overview, release_date}) => {
    const [show, setShow] = useState(false);
    const [favorite, setFavorite] = useState(false)
    const [details, setDetails] = useState({});

    const history = useHistory();
    const id = history.location.pathname.split('/')[2];
    const list = JSON.parse(localStorage.getItem('favorite'));

    useEffect(() => {
        axios
        .get(`https://api.themoviedb.org/3/movie/${id}?api_key=96aa09220754ff3d7e85f718424d9995`)
        .then((res) => {
            setDetails(res.data);
            const movieInList = list.filter((movie) => movie.id === res.data.id)[0];
            if (movieInList) {
                setFavorite(true);            
            }
        });
    });

    const AddToList = () => {        
        if (list) {
            localStorage.removeItem('favorite');
            list.push(details);
            localStorage.setItem('favorite', JSON.stringify(list));
            setFavorite(true);
        } else {
            localStorage.setItem('favorite', JSON.stringify([details]));
            setFavorite(true);
        }
    }

    const RemoveFromList = () => {
        const movie = list.filter((movie) => movie.id === details.id)[0];
        list.splice(list.indexOf(movie), 1);        
        localStorage.removeItem('favorite');
        localStorage.setItem('favorite', JSON.stringify(list));
        setFavorite(false);        
    }

    return (
        <>
            <div className="w-full h-full">
                <div className="flex flex-no-wrap">
                    {/* Sidebar start */}
                    <div className="w-60 absolute lg:relative bg-white shadow flex-col justify-between hidden lg:flex pb-12">
                        <div className="px-8 h-screen">
                            <div className="h-16 w-full flex items-center">
                                <img alt='logo' className="h-12 w-12 mt-1" src={Logo}></img>
                                Movie TV
                            </div>
                            <ul className="mt-2">
                                <Link to={'/'}>
                                    <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
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
                                        <li className="flex w-full justify-between text-indigo-700 cursor-pointer items-center mb-6">
                                            <div className="flex items-center">
                                                <span className="text-sm">All Movie</span>
                                            </div>
                                        </li>
                                        <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center mb-6">
                                            <div className="flex items-center">
                                                <span className="text-sm">Favorite Movie</span>
                                            </div>
                                        </li>
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
                        <div className="flex justify-center items-center">
                            {details.id ? 
                                <div className="w-full md:w-full lg:w-full max-w-screen-2xl rounded overflow-hidden shadow-lg m-10 flex justify-between">
                                    <div className="md:flex-shrink-0">
                                    <img className="md:w-56"
                                        src={IMAGE_API + details.poster_path}
                                        alt={details.title} />
                                    </div>
                                    <div className="flex flex-col flex-grow px-8 py-4 bg-color-333">
                                    <h3 className="font-bold text-4xl md:text-2xl lg:text-2xl text-gray-800 movie--title">{details.title}</h3>
                                    <span className="movie--year text-xl lg:text-sm lg:mb-4">{details.release_date}</span>
                                    <div className="flex-grow">
                                        <p className="text-xl md:text-base lg:text-base text-gray-800 leading-snug truncate-overflow">{details.overview}</p>
                                    </div>
                                    <div className="button-container flex justify-end mb-2">
                                        <button onClick={!favorite ? AddToList : RemoveFromList} className="text-indigo-700 bg-transparent border-indigo-700 dark:text-gray-100 dark:bg-indigo-700 border px-4 py-2 text-sm font-medium leading-3 rounded focus:outline-none mt-5 hover:opacity-50">
                                            {!favorite ? 'Add to List' : 'Remove from List'}
                                        </button>
                                    </div>
                                    </div>
                                </div>
                            : <></>
                            } 
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    );
}

export default MovieDetail;


