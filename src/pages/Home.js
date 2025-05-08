import React, { useState } from 'react';
import TrendingMovies from '../components/TrendingMovies';
import SearchBar from '../components/SearchBar';

const Home = () => {
    const [movies, setMovies] = useState([]);

    return (
        <div className='app-container'>
            <h2 style={{ color: "#000" }}>Trending Movies</h2>
            <SearchBar setMovies={setMovies} />
            <TrendingMovies movies={movies} setMovies={setMovies} />
        </div>
    );
};

export default Home;
