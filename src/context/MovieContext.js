import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieContextProvider = ({ children }) => {
    const [movies, setMovies] = useState([]);
    const [lastSearch, setLastSearch] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [userID, setUserID] = useState(null);

    // Handle user login state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserID(user.uid);
                loadFavorites(user.uid);
            } else {
                setUserID(null);
                setFavorites([]);
            }
        });

        return () => unsubscribe();
    }, []);

    // Load last searched movies and search term from local storage
    useEffect(() => {
        try {
            const savedMovies = JSON.parse(localStorage.getItem("lastSearchedMovies")) || [];
            const savedSearch = localStorage.getItem("lastSearchTerm") || "";

            if (Array.isArray(savedMovies)) setMovies(savedMovies);
            if (typeof savedSearch === "string") setLastSearch(savedSearch);
        } catch (error) {
            console.error("Error loading last searched movies:", error);
        }
    }, []);

    // Save last searched movies and search term to local storage
    useEffect(() => {
        try {
            if (Array.isArray(movies)) {
                localStorage.setItem("lastSearchedMovies", JSON.stringify(movies));
            }

            if (typeof lastSearch === "string") {
                localStorage.setItem("lastSearchTerm", lastSearch);
            }
        } catch (error) {
            console.error("Error saving last searched movies:", error);
        }
    }, [movies, lastSearch]);

    // Load favorites from local storage for the current user
    const loadFavorites = (uid) => {
        try {
            const storedFavorites = localStorage.getItem(`favorites_${uid}`);
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error("Error loading favorites:", error);
        }
    };

    // Save favorites to local storage whenever they change
    useEffect(() => {
        if (userID && Array.isArray(favorites)) {
            try {
                localStorage.setItem(`favorites_${userID}`, JSON.stringify(favorites));
            } catch (error) {
                console.error("Error saving favorites:", error);
            }
        }
    }, [favorites, userID]);

    // Add a movie to favorites
    const addFavorite = (movie) => {
        if (!favorites.some(fav => fav.id === movie.id)) {
            setFavorites((prevFavorites) => [...prevFavorites, movie]);
        }
    };

    // Remove a movie from favorites
    const removeFavorite = (movieID) => {
        setFavorites((prevFavorites) => prevFavorites.filter(movie => movie.id !== movieID));
    };

    return (
        <MovieContext.Provider 
            value={{ 
                movies, 
                setMovies, 
                lastSearch, 
                setLastSearch, 
                favorites, 
                addFavorite, 
                removeFavorite 
            }}
        >
            {children}
        </MovieContext.Provider>
    );
};
