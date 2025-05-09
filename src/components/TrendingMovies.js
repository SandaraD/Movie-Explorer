import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Grid, Button, Box, CircularProgress } from "@mui/material";

const TrendingMovies = ({ searchTerm }) => {
    //State to store list of movies
    const [movies, setMovies] = useState([]);
    //state to store current page
    const [page, setPage] = useState(1);
    //state to show loading spinner
    const [loading, setLoading] = useState(false);
    //state to track if there are more movies to load
    const [hasMore, setHasMore] = useState(true);

    // Fetch trending or search results
    const fetchMovies = async (page) => {
        setLoading(true);
        try {
            const endpoint = searchTerm
                ? `https://api.themoviedb.org/3/search/movie`
                : `https://api.themoviedb.org/3/trending/movie/week`;


                //API request paramters
            const params = {
                api_key: process.env.REACT_APP_TMDB_API_KEY,
                page,
            };

            //add search query if search term exists
            if (searchTerm) {
                params.query = searchTerm;
            }

            //fetch data from API
            const response = await axios.get(endpoint, { params });
            const newMovies = response.data.results;

            //set new movies to the existing list
            setMovies((prevMovies) => [...prevMovies, ...newMovies]);
            //set hasMore to false if there are no movies to load
            setHasMore(newMovies.length > 0);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
        setLoading(false);
    };

    // Initial fetch
    useEffect(() => {
        setMovies([]);
        setPage(1);
        fetchMovies(1);
    }, [searchTerm]);

    // Fetch more movies when the page changes
    useEffect(() => {
        if (page > 1) fetchMovies(page);
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

                {/* Display loading spinnner while fetching movies */}
            {loading && (
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
                    <CircularProgress />
                </Box>
            )}

            {/* Display load more button if there are more movies to loadd */}
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
