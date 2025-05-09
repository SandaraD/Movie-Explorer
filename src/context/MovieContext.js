// // // src/context/MovieContext.js
// // import React, { createContext, useContext, useState, useEffect } from 'react';

// // // Create the Movie Context
// // const MovieContext = createContext();

// // export const useMovieContext = () => useContext(MovieContext);

// // export const MovieContextProvider = ({ children }) => {
// //     const [movies, setMovies] = useState([]);
// //     const [lastSearch, setLastSearch] = useState('');

// //     // Load the last searched movies from local storage on startup
// //     useEffect(() => {
// //         const savedMovies = localStorage.getItem("lastSearchedMovies");
// //         const savedSearch = localStorage.getItem("lastSearchTerm");

// //         if (savedMovies) {
// //             setMovies(JSON.parse(savedMovies));
// //         }

// //         if (savedSearch) {
// //             setLastSearch(savedSearch);
// //         }
// //     }, []);

// //     // Save the current movies and search term to local storage whenever they change
// //     useEffect(() => {
// //         if (movies.length > 0) {
// //             localStorage.setItem("lastSearchedMovies", JSON.stringify(movies));
// //         }

// //         if (lastSearch) {
// //             localStorage.setItem("lastSearchTerm", lastSearch);
// //         }
// //     }, [movies, lastSearch]);

// //     const updateMovies = (newMovies, searchTerm) => {
// //         setMovies(newMovies);
// //         setLastSearch(searchTerm);
// //     };

// //     return (
// //         <MovieContext.Provider value={{ movies, setMovies: updateMovies, lastSearch }}>
// //             {children}
// //         </MovieContext.Provider>
// //     );
// // };

// import React, { createContext, useContext, useState, useEffect } from 'react';

// // Create the Movie Context
// const MovieContext = createContext();

// export const useMovieContext = () => useContext(MovieContext);

// export const MovieContextProvider = ({ children }) => {
//     const [movies, setMovies] = useState([]);
//     const [lastSearch, setLastSearch] = useState("");
//     const [favorites, setFavorites] = useState([]);

//     // Load the last searched movies and favorites from local storage on startup
//     useEffect(() => {
//         const savedMovies = localStorage.getItem("lastSearchedMovies");
//         const savedSearch = localStorage.getItem("lastSearchTerm");
//         const savedFavorites = localStorage.getItem("favoriteMovies");

//         if (savedMovies) setMovies(JSON.parse(savedMovies));
//         if (savedSearch) setLastSearch(savedSearch);
//         if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
//     }, []);

//     // Save the current movies, search term, and favorites to local storage whenever they change
//     useEffect(() => {
//         if (movies.length > 0) localStorage.setItem("lastSearchedMovies", JSON.stringify(movies));
//         if (lastSearch) localStorage.setItem("lastSearchTerm", lastSearch);
//         if (favorites.length > 0) localStorage.setItem("favoriteMovies", JSON.stringify(favorites));
//     }, [movies, lastSearch, favorites]);

//     const updateMovies = (newMovies, searchTerm) => {
//         setMovies(newMovies);
//         setLastSearch(searchTerm);
//     };

//     const toggleFavorite = (movie) => {
//         const isFavorite = favorites.some(fav => fav.id === movie.id);
//         const updatedFavorites = isFavorite 
//             ? favorites.filter(fav => fav.id !== movie.id)
//             : [...favorites, movie];

//         setFavorites(updatedFavorites);
//     };

//     return (
//         <MovieContext.Provider value={{ movies, setMovies: updateMovies, lastSearch, favorites, toggleFavorite }}>
//             {children}
//         </MovieContext.Provider>
//     );
// };


// src/context/MovieContext.js
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

    // Load favorites from local storage for the current user
    const loadFavorites = (uid) => {
        const storedFavorites = localStorage.getItem(`favorites_${uid}`);
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    };

    // Save favorites to local storage whenever they change
    useEffect(() => {
        if (userID) {
            localStorage.setItem(`favorites_${userID}`, JSON.stringify(favorites));
        }
    }, [favorites, userID]);

    const addFavorite = (movie) => {
        setFavorites((prevFavorites) => {
            if (!prevFavorites.some(fav => fav.id === movie.id)) {
                return [...prevFavorites, movie];
            }
            return prevFavorites;
        });
    };

    const removeFavorite = (movieID) => {
        setFavorites((prevFavorites) => prevFavorites.filter(movie => movie.id !== movieID));
    };

    return (
        <MovieContext.Provider value={{ movies, setMovies, lastSearch, setLastSearch, favorites, addFavorite, removeFavorite }}>
            {children}
        </MovieContext.Provider>
    );
};
