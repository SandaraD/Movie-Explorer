import React, { useState } from 'react';
import axios from 'axios';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchBar = ({ setMovies }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!searchTerm.trim()) {
            fetchTrendingMovies();
            return;
        }

        try {
            const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: process.env.REACT_APP_TMDB_API_KEY,
                    query: searchTerm,
                    page: 1,
                },
            });
            setMovies(response.data.results);
        } catch (error) {
            console.error("Error fetching search results:", error);
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        fetchTrendingMovies();
    };

    const fetchTrendingMovies = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, {
                params: {
                    api_key: process.env.REACT_APP_TMDB_API_KEY,
                },
            });
            setMovies(response.data.results);
        } catch (error) {
            console.error("Error fetching trending movies:", error);
        }
    };

    return (
        <form onSubmit={handleSearch} style={{ display: "flex", marginBottom: "20px" }}>
            <TextField 
                fullWidth
                variant="outlined"
                placeholder="Search for a movie"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            {searchTerm && (
                                <IconButton onClick={handleClear}>
                                    <ClearIcon />
                                </IconButton>
                            )}
                            <IconButton type="submit">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
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
