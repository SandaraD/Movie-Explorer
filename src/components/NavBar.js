import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';

const NavBar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: "#121212", marginBottom: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.4)" }}>
            <Container>
                <Toolbar>
                    <MovieFilterIcon fontSize="large" sx={{ marginRight: 2, color: "#f50057" }} />
                    <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: "bold", color: "#fff", letterSpacing: "1px" }}>
                        Movie Explorer
                    </Typography>
                    <Box>
                        <Button color="inherit" component={Link} to="/" sx={{ marginRight: 2 }}>
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/favorites" sx={{ marginRight: 2 }}>
                            Favorites
                        </Button>
                        <Button color="secondary" variant="outlined" onClick={handleLogout} sx={{ borderColor: "#f50057", color: "#f50057" }}>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
