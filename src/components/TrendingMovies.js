import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Grid, Button, Box, CircularProgress } from "@mui/material";
import { useMovieContext } from "../context/MovieContext";

const TrendingMovies = () => {
    const { movies, setMovies, lastSearch } = useMovieContext();
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Fetch trending or search results
    const fetchMovies = async (page, searchTerm = '') => {
        setLoading(true);
        try {
            const endpoint = searchTerm
                ? `https://api.themoviedb.org/3/search/movie`
                : `https://api.themoviedb.org/3/trending/movie/week`;

            const params = {
                api_key: process.env.REACT_APP_TMDB_API_KEY,
                page,
            };

            if (searchTerm) {
                params.query = searchTerm;
            }

            const response = await axios.get(endpoint, { params });
            const newMovies = response.data.results;

            // Add new movies to existing ones for infinite scrolling
            if (page > 1) {
                setMovies((prevMovies) => [...prevMovies, ...newMovies]);
            } else {
                setMovies(newMovies);
            }

            setHasMore(newMovies.length > 0);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
        setLoading(false);
    };

    // Fetch movies on component mount or when search term changes
    useEffect(() => {
        setPage(1);
        fetchMovies(1, lastSearch);
    }, [lastSearch]);

    // Fetch more movies when the page changes
    useEffect(() => {
        if (page > 1) fetchMovies(page, lastSearch);
    }, [page]);

    return (
        <Box sx={{ padding: 2 }}>
            {/* Display movies in a grid */}
            <Grid container spacing={3}>
                {movies.map((movie) => (
                    <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                        <MovieCard movie={movie} />
                    </Grid>
                ))}
            </Grid>

            {/* Display loading spinner while fetching movies */}
            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Display load more button if there are more movies to load */}
            {hasMore && !loading && (
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
                    <Button 
                        variant="contained" 
                        onClick={() => setPage((prevPage) => prevPage + 1)}
                        sx={{ backgroundColor: "#f50057", color: "#fff", padding: "10px 20px", borderRadius: "30px" }}
                    >
                        Load More
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default TrendingMovies;
