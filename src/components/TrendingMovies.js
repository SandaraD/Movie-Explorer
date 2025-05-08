import React, { useEffect } from "react";
import axios from "axios";

const TrendingMovies = () => {
    const [movies, setMovies] = React.useState([]);

    useEffect(() => {
        const fetchTrendingMovies = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, {
                    params: {
                        api_key: process.env.REACT_APP_TMDB_API_KEY
                    }
                });
                setMovies(response.data.results);
            }catch(error) {
                console.error('Error fetching trending movies:', error);
            }
        };

        fetchTrendingMovies();
    }, []);

    return (
<div className="movie-grid">
            {movies.map(movie => (
                <div key={movie.id} className="movie-card">
                    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
                    <h3>{movie.title}</h3>
                    <p>{movie.release_date}</p>
                </div>
            ))}
        </div>
    )
}

export default TrendingMovies;