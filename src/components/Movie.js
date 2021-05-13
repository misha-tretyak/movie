import React from "react";
import {Link} from 'react-router-dom';

const IMAGE_API = 'https://image.tmdb.org/t/p/w1280';
const DEFAULT_IMG = 'https://images.unsplash.com/photo-1587389832557-d012ed24b42d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80';

const Movie = ({poster_path, title, id}, props) => {

    return (
        <div className="w-60 shadow-lg ml-6 mt-6 mb-3">
            <div className="flex items-center rounded-t-md justify-between bg-white">
                <img className="object-cover rounded-t-md" alt={title} src={ poster_path ? IMAGE_API + poster_path : DEFAULT_IMG}></img>
            </div>
            <div className="border-t p-6 bg-white dark:bg-gray-800 rounded-b-md">
                <h1 className="text-base font-semibold leading-4 text-left text-gray-800 dark:text-gray-100">{title}</h1>
                <Link to={'/movie/' + id}>
                    <button className="text-indigo-700 bg-transparent border-indigo-700 dark:text-gray-100 dark:bg-indigo-700 border px-4 py-2 text-sm font-medium leading-3 rounded focus:outline-none mt-5 hover:opacity-50">
                        View Details
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Movie;
