// // Home.js
// import React, { useState, useContext } from 'react';
// import TrendingMovies from '../components/TrendingMovies';
// import SearchBar from '../components/SearchBar';
// import { ThemeContext } from '../context/ThemeContext';

// const Home = () => {
//     const [movies, setMovies] = useState([]);
//     const { darkMode } = useContext(ThemeContext);

//     return (
//         <div className='app-container'>
//             <h2 style={{ 
//                 color: darkMode ? "#fff" : "#000", 
//                 marginBottom: "20px",
//                 transition: "color 0.3s"
//             }}>
//                 Trending Movies
//             </h2>
//             <SearchBar setMovies={setMovies} />
//             <TrendingMovies movies={movies} setMovies={setMovies} />
//         </div>
//     );
// };

// export default Home;


// src/pages/Home.js
import React, { useEffect, useContext } from 'react';
import TrendingMovies from '../components/TrendingMovies';
import SearchBar from '../components/SearchBar';
import { useMovieContext } from '../context/MovieContext';
import { ThemeContext } from '../context/ThemeContext';

const Home = () => {
    const { movies, setMovies, lastSearch } = useMovieContext();
    const { darkMode } = useContext(ThemeContext);

    // Load last searched movies on initial load
    useEffect(() => {
        if (movies.length === 0 && lastSearch) {
            console.log("Loading last searched movies from local storage");
        }
    }, [movies, lastSearch]);

    return (
      <div className="app-container">
        <h2 style={{ color: darkMode ? "#fff" : "#000", marginBottom: "20px" }}>
          Trending Movies
        </h2>
        <SearchBar setMovies={setMovies} />
        <TrendingMovies movies={movies} setMovies={setMovies} />
      </div>
    );
};

export default Home;
