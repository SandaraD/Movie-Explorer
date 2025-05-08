import { Box, Card, CardContent, CardMedia, Rating, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
    return (
        <Card
            component={Link}
            to ={`/movies/${movie.id}`}
            sx={{
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                textDecoration: "none",
                color: "#000",
                transition: "transform 0.2s, box-shadow 0.2s",
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
                xs={{ height: 300}}
            />

            <CardContent>
                <Typography variant="h6" gutterBotto >
                    {movie.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {new Date(movie.release_date).getFullYear()}
                </Typography>
                <Box xs={{ marginTop: 1}}>
                    <Rating 
                        value={movie.vote_average /2}
                        precision={0.5}
                        readOnly
                    />
                    <Typography variant='caption' color='text.secondary'>
                        ({movie.vote_average.toFixed(1)})
                    </Typography>
                </Box>
            </CardContent>

        </Card>
    )
};

export default MovieCard;