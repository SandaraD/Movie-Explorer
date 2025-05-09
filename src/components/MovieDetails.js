import { Box, Chip, Container, Grid, Typography, Divider, Paper, Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/MovieDetails.css';

const MovieDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState('');

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                // Fetch Movie Details
                const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {
                        api_key: process.env.REACT_APP_TMDB_API_KEY,
                    },
                });
                setMovie(movieResponse.data);

                // Fetch Movie Cast
                const castResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
                    params: {
                        api_key: process.env.REACT_APP_TMDB_API_KEY,
                    },
                });
                setCast(castResponse.data.cast.slice(0, 10)); // Limit to top 10 cast members

                // Fetch Movie Trailer
                const trailerResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
                    params: {
                        api_key: process.env.REACT_APP_TMDB_API_KEY,
                    },
                });
                const officialTrailer = trailerResponse.data.results.find(
                    (video) => video.type === 'Trailer' && video.site === 'YouTube'
                );
                if (officialTrailer) {
                    setTrailer(`https://www.youtube.com/embed/${officialTrailer.key}`);
                }

            } catch (error) {
                console.error("Error fetching movie details:", error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) return <div style={{ color: "#fff", textAlign: "center", marginTop: "100px" }}>Loading...</div>;

    return (
      <Container sx={{ padding: 4, color: "#000", maxWidth: "1400px" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/")}
          sx={{
            marginBottom: 3,
            backgroundColor: "#f50057",
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "15px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
          }}
        >
          ⬅︎ Back to Home
        </Button>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: { xs: "center", md: "flex-start" },
          }}
        >
          {/* Movie Poster */}
          <Box
            sx={{
              flex: "0 0 300px",
              width: { xs: "100%", sm: "300px" },
              marginBottom: { xs: 3, md: 0 },
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{
                borderRadius: "15px",
                width: "100%",
                boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              }}
            />
          </Box>

          {/* Movie Details and Trailer */}
          <Box sx={{ flex: 1, width: "100%" }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold" }}>
              {movie.title}
            </Typography>
            {movie.tagline && (
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ fontStyle: "italic", color: "#f50057" }}
              >
                {movie.tagline}
              </Typography>
            )}
            <Typography variant="body1" paragraph>
              {movie.overview}
            </Typography>

            <Box sx={{ marginBottom: 2 }}>
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{
                    marginBottom: 1,
                    marginRight: 1,
                    backgroundColor: "#f50057",
                    color: "#fff",
                  }}
                />
              ))}
            </Box>

            <Typography variant="body2" color="textSecondary" gutterBottom>
              Release Date: {movie.release_date}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Rating: {movie.vote_average.toFixed(1)} / 10
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Runtime: {movie.runtime} minutes
            </Typography>

            {trailer && (
              <Paper
                elevation={3}
                sx={{
                  marginTop: 3,
                  borderRadius: "15px",
                  overflow: "hidden",
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                <iframe
                  width="100%"
                  height="220"
                  src={trailer}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Movie Trailer"
                ></iframe>
              </Paper>
            )}
          </Box>
        </Box>

        {/* Cast Section */}
        <Divider sx={{ marginY: 4 }} />
        <Typography variant="h4" sx={{ marginBottom: 2}}>
          Cast
        </Typography>
        <Grid container spacing={2}>
          {cast.map((actor) => (
            <Grid item key={actor.id} xs={6} sm={4} md={2}>
              <div className="actor-card">
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                  className="actor-image"
                  style={{
                    borderRadius: "10px",
                    width: "100%",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                  }}
                />
                <Typography
                  variant="body2"
                  align="center"
                  sx={{ marginTop: 1 }}
                >
                  {actor.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  align="center"
                >
                  as {actor.character}
                </Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
};

export default MovieDetails;
