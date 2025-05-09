// import React from 'react';
// import { useMovieContext } from '../context/MovieContext';
// import MovieCard from '../components/MovieCard';
// import { Grid, Container, Typography, Card } from '@mui/material';

// const FavoritesPage = () => {
//     const { favorites } = useMovieContext();

//     return (
//         <Container sx={{ padding: 4 }}>
//             <Typography variant="h3" gutterBottom>
//                 Your Favorite Movies
//             </Typography>
//             <Grid container spacing={3}>
//                 <Card >
//                 {favorites.map(movie => (
//                     <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
//                         <MovieCard movie={movie} />
//                     </Grid>
//                 ))}
//                 </Card>
//             </Grid>
//         </Container>
//     );
// };

// export default FavoritesPage;


import React from 'react';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';
import { Grid, Container, Typography, Box } from '@mui/material';

const FavoritesPage = () => {
    const { favorites } = useMovieContext();

    return (
        <Container sx={{ padding: 4, minHeight: '100vh' }}>
            <Typography variant="h3" gutterBottom sx={{ color: "#f50057", fontWeight: "bold" }}>
                Your Favorite Movies
            </Typography>

            {favorites.length === 0 ? (
                <Box sx={{ textAlign: "center", marginTop: 4, color: "#666" }}>
                    <Typography variant="h5" gutterBottom>
                        You have no favorite movies yet.
                    </Typography>
                    <Typography variant="body1">
                        Start adding some by clicking the heart icon on your favorite movies.
                    </Typography>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {favorites.map(movie => (
                        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                            <MovieCard movie={movie} />
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default FavoritesPage;
