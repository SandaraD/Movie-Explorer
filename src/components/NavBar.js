// NavBar.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { ThemeContext } from '../context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const NavBar = () => {
    const navigate = useNavigate();
    const { darkMode, toggleTheme } = useContext(ThemeContext);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
    };

    return (
        <AppBar 
            position="static" 
            sx={{ 
                backgroundColor: darkMode ? "#222" : "#121212", 
                marginBottom: 3, 
                boxShadow: darkMode ? "0 4px 20px rgba(255,255,255,0.1)" : "0 4px 20px rgba(0,0,0,0.4)"
            }}
        >
            <Container>
                <Toolbar>
                    <MovieFilterIcon fontSize="large" sx={{ marginRight: 2, color: "#f50057" }} />
                    <Typography 
                        variant="h5" 
                        sx={{ 
                            flexGrow: 1, 
                            fontWeight: "bold", 
                            color: "#fff", 
                            letterSpacing: "1px" 
                        }}
                    >
                        Movie Explorer
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Button color="inherit" component={Link} to="/" sx={{ marginRight: 2 }}>
                            Home
                        </Button>
                        <Button color="inherit" component={Link} to="/favorites" sx={{ marginRight: 2 }}>
                            Favorites
                        </Button>
                        <Button 
                            onClick={toggleTheme} 
                            sx={{ 
                                marginRight: 2, 
                                color: darkMode ? "#ffeb3b" : "#f50057" 
                            }}
                        >
                            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
                        </Button>
                        <Button 
                            color="secondary" 
                            variant="outlined" 
                            onClick={handleLogout} 
                            sx={{ 
                                borderColor: "#f50057", 
                                color: "#f50057" 
                            }}
                        >
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
