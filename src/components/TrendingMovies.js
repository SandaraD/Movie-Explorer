import React, { useEffect, useState } from "react";
import axios from "axios";

const TrendingMovies = ({ movies, setMovies }) => {
    const [trendingMovies, setTrendingMovies] = useState([]);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, {
                    params: {
                        api_key: process.env.REACT_APP_TMDB_API_KEY,
                    },
                });
                setTrendingMovies(response.data.results);
                
                // Set the default movies to trending if no search term
                if (movies.length === 0) {
                    setMovies(response.data.results);
                }
            } catch (error) {
                console.error("Error fetching trending movies:", error);
            }
        };

        fetchTrendingMovies();
    }, [movies, setMovies]);

    return (
        <div className="movie-grid">
            {movies.map(movie => (
                <div key={movie.id} className="movie-card">
                    <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date}</p>
                </div>
            ))}
        </div>
    );
};

export default TrendingMovies;
