import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import FavoritesPage from './pages/FavoritesPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavBar from './components/NavBar';
import AuthBackground from './components/AuthBackground';
import './styles/App.css';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import MovieDetails from './components/MovieDetails';
import { ThemeContextProvider } from './context/ThemeContext';
import { MovieContextProvider } from './context/MovieContext';

function AppContent() {
    // state for handling user login
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    // handle user login state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
                localStorage.setItem("isLoggedIn", "true");
            } else {
                setIsLoggedIn(false);
                localStorage.removeItem("isLoggedIn");
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // Show a loading screen while checking auth status
    if (loading) {
        return (
            <div style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>
                Loading...
            </div>
        );
    }

    return (
        <MovieContextProvider>
            <Router>
                <AuthBackground>
                    {isLoggedIn && <NavBar />}
                    <Routes>
                        <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                        <Route path="/favorites" element={isLoggedIn ? <FavoritesPage /> : <Navigate to="/login" />} />
                        <Route path="/movie/:id" element={isLoggedIn ? <MovieDetails /> : <Navigate to="/login" />} />
                        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
                        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <Signup />} />
                        <Route path="*" element={<Navigate to={isLoggedIn ? "/" : "/login"} />} />
                    </Routes>
                </AuthBackground>
            </Router>
        </MovieContextProvider>
    );
}

function App() {
    return (
        <ThemeContextProvider>
            <AppContent />
        </ThemeContextProvider>
    );
}

export default App;
