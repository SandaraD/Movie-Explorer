import React from 'react';
import TrendingMovies from '../components/TrendingMovies';

const Home = () => {
    return (
        <div className='app-container'>
            <h2>Trending Movies</h2>
            <TrendingMovies />
        </div>
    );
};

export default Home;