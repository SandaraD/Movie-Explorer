import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useMovieContext } from '../context/MovieContext';

const SearchBar = () => {
    const { setMovies, lastSearch } = useMovieContext();
    const [searchTerm, setSearchTerm] = useState('');

    // Load the last search term on startup
    useEffect(() => {
        if (lastSearch) {
            setSearchTerm(lastSearch);
            fetchMovies(lastSearch);
        } else {
            fetchTrendingMovies();
        }
    }, [lastSearch]);

    // Fetch trending movies if no search term is present
    const fetchTrendingMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, {
                params: {
                    api_key: process.env.REACT_APP_TMDB_API_KEY,
                },
            });
            setMovies(response.data.results || [], '');
        } catch (error) {
            console.error("Error fetching trending movies:", error);
        }
    };

    // Fetch movies based on the search term
    const fetchMovies = async (term) => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: process.env.REACT_APP_TMDB_API_KEY,
                    query: term,
                    page: 1,
                },
            });
            setMovies(response.data.results || [], term);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    // Handle form submission
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            fetchTrendingMovies();
            return;
        }
        fetchMovies(searchTerm);
    };

    // Handle clear button
    const handleClear = () => {
        setSearchTerm('');
        fetchTrendingMovies();
    };

    return (
        <form onSubmit={handleSearch} style={{ display: "flex", marginBottom: "20px" }}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder={lastSearch ? `Last Search: ${lastSearch}` : "Search for a movie"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    style: {
                        backgroundColor: "#fff",
                        color: "#000",  // Input text color
                    },
                    endAdornment: (
                        <InputAdornment position="end">
                            {searchTerm && (
                                <IconButton onClick={handleClear} sx={{ color: "#000" }}>
                                    <ClearIcon />
                                </IconButton>
                            )}
                            <IconButton type="submit" sx={{ color: "#000" }}>
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                inputProps={{
                    style: {
                        color: "#000",  // Text color for typed input
                    },
                }}
                sx={{
                    backgroundColor: "#fff",
                    borderRadius: "25px",
                }}
            />
        </form>
    );
};

export default SearchBar;
