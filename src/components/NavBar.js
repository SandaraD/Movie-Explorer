import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { ThemeContext } from '../context/ThemeContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { auth } from '../firebase';
import { signOut } from "firebase/auth";

const NavBar = () => {
    const navigate = useNavigate();
    const { darkMode, toggleTheme } = useContext(ThemeContext);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('isLoggedIn');
            navigate('/login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    const toggleDrawer = (open) => () => {
        setDrawerOpen(open);
    };

    return (
        <>
            <AppBar 
                position="static" 
                sx={{ 
                    backgroundColor: darkMode ? "#222" : "#121212", 
                    marginBottom: 3, 
                    boxShadow: darkMode ? "0 4px 20px rgba(255,255,255,0.1)" : "0 4px 20px rgba(0,0,0,0.4)"
                }}
            >
                <Container>
                    <Toolbar sx={{ justifyContent: "space-between" }}>
                        {/* Logo Always Visible */}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <MovieFilterIcon fontSize="large" sx={{ marginRight: 1, color: "#f50057" }} />
                            <Typography 
                                variant="h5" 
                                sx={{ 
                                    fontWeight: "bold", 
                                    color: "#fff", 
                                    letterSpacing: "1px"
                                }}
                            >
                                Movie Explorer
                            </Typography>
                        </Box>

                        {/* Desktop Menu */}
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: "center" }}>
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

                        {/* Mobile Menu Button */}
                        <IconButton 
                            edge="end" 
                            color="inherit" 
                            aria-label="menu" 
                            onClick={toggleDrawer(true)} 
                            sx={{ display: { sm: 'none' }, color: "#fff" }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Toolbar>
                </Container>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250, backgroundColor: darkMode ? "#333" : "#fff", height: "100%" }}>
                    <IconButton onClick={toggleDrawer(false)} sx={{ margin: 1, color: darkMode ? "#ffeb3b" : "#f50057" }}>
                        <CloseIcon />
                    </IconButton>
                    <Divider />
                    <List>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/" onClick={toggleDrawer(false)}>
                                <ListItemText primary="Home" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton component={Link} to="/favorites" onClick={toggleDrawer(false)}>
                                <ListItemText primary="Favorites" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={toggleTheme}>
                                <ListItemText primary={darkMode ? "Light Mode" : "Dark Mode"} />
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleLogout}>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default NavBar;
