// // // MovieCard.js
// // import { Box, Card, CardContent, CardMedia, Rating, Typography } from '@mui/material';
// // import React, { useContext } from 'react';
// // import { Link } from 'react-router-dom';
// // import { ThemeContext } from '../context/ThemeContext';

// // const MovieCard = ({ movie }) => {
// //     const { darkMode } = useContext(ThemeContext);

// //     return (
// //         <Card
// //             component={Link}
// //             to={`/movie/${movie.id}`}
// //             sx={{
// //                 borderRadius: "15px",
// //                 overflow: "hidden",
// //                 boxShadow: darkMode ? "0 4px 20px rgba(255,255,255,0.1)" : "0 4px 20px rgba(0,0,0,0.1)",
// //                 textDecoration: "none",
// //                 color: darkMode ? "#fff" : "#000",
// //                 transition: "transform 0.2s, box-shadow 0.2s",
// //                 '&:hover': {
// //                     transform: "scale(1.05)",
// //                     boxShadow: darkMode ? "0 8px 30px rgba(255,255,255,0.2)" : "0 8px 30px rgba(0,0,0,0.2)",
// //                 }
// //             }}
// //         >
// //             <CardMedia
// //                 component="img"
// //                 image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
// //                 alt={movie.title}
// //                 sx={{ height: 300 }}
// //             />

// //             <CardContent>
// //                 <Typography 
// //                     variant="h6" 
// //                     gutterBottom
// //                     sx={{
// //                         color: darkMode ? "#fff" : "#000",
// //                         transition: "color 0.3s"
// //                     }}
// //                 >
// //                     {movie.title}
// //                 </Typography>
// //                 <Typography variant="body2" color="text.secondary">
// //                     {new Date(movie.release_date).getFullYear()}
// //                 </Typography>
// //                 <Box sx={{ marginTop: 1 }}>
// //                     <Rating 
// //                         value={movie.vote_average / 2}
// //                         precision={0.5}
// //                         readOnly
// //                     />
// //                     <Typography variant='caption' color='text.secondary'>
// //                         ({movie.vote_average.toFixed(1)})
// //                     </Typography>
// //                 </Box>
// //             </CardContent>

// //         </Card>
// //     );
// // };

// // export default MovieCard;


// import { Box, Card, CardContent, CardMedia, Rating, Typography, IconButton } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { useMovieContext } from '../context/MovieContext';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// const MovieCard = ({ movie }) => {
//     const { favorites, toggleFavorite } = useMovieContext();
//     const isFavorite = favorites.some(fav => fav.id === movie.id);

//     return (
//         <Card
//             component={Link}
//             to={`/movie/${movie.id}`}
//             sx={{
//                 borderRadius: "15px",
//                 overflow: "hidden",
//                 boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
//                 textDecoration: "none",
//                 color: "#000",
//                 transition: "transform 0.2s, box-shadow 0.2s",
//                 position: "relative",
//                 '&:hover': {
//                     transform: "scale(1.05)",
//                     boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
//                 }
//             }}
//         >
//             <CardMedia
//                 component="img"
//                 image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//                 alt={movie.title}
//                 sx={{ height: 300 }}
//             />

//             <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                     {movie.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                     {new Date(movie.release_date).getFullYear()}
//                 </Typography>
//                 <Box sx={{ marginTop: 1, display: "flex", justifyContent: "space-between" }}>
//                     <Rating 
//                         value={movie.vote_average / 2}
//                         precision={0.5}
//                         readOnly
//                     />
//                     <IconButton 
//                         onClick={(e) => {
//                             e.preventDefault();  // Prevents the card from being clicked when favoriting
//                             toggleFavorite(movie);
//                         }} 
//                         sx={{ color: isFavorite ? "#f50057" : "#ccc" }}
//                     >
//                         {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
//                     </IconButton>
//                 </Box>
//             </CardContent>
//         </Card>
//     );
// };

// export default MovieCard;


import { Box, Card, CardContent, CardMedia, IconButton, Rating, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const MovieCard = ({ movie }) => {
    const { favorites, addFavorite, removeFavorite } = useMovieContext();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        setIsFavorite(favorites.some(fav => fav.id === movie.id));
    }, [favorites, movie.id]);

    const handleFavoriteToggle = (e) => {
        e.preventDefault(); // Prevent navigation on favorite click
        if (isFavorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    };

    return (
        <Card
            component={Link}
            to={`/movie/${movie.id}`}
            sx={{
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                textDecoration: "none",
                color: "#000",
                transition: "transform 0.2s, box-shadow 0.2s",
                position: "relative",
                '&:hover': {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
                }
            }}
        >
            <CardMedia
                component="img"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                sx={{ height: 300 }}
            />

            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {new Date(movie.release_date).getFullYear()}
                </Typography>
                <Box sx={{ marginTop: 1 }}>
                    <Rating 
                        value={movie.vote_average / 2}
                        precision={0.5}
                        readOnly
                    />
                    <Typography variant='caption' color='text.secondary'>
                        ({movie.vote_average.toFixed(1)})
                    </Typography>
                </Box>

                {/* Favorite Icon */}
                <IconButton
                    onClick={handleFavoriteToggle}
                    sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        color: isFavorite ? "#f50057" : "#fff",
                        backgroundColor: isFavorite ? "#fff" : "#f50057",
                        borderRadius: "50%",
                        transition: "0.3s",
                        '&:hover': {
                            backgroundColor: "#f50057",
                            color: "#fff",
                        }
                    }}
                >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
            </CardContent>
        </Card>
    );
};

export default MovieCard;
