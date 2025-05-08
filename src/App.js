import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import FavoritesPage from './pages/FavoritesPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavBar from './components/NavBar';
import AuthBackground from './components/AuthBackground';
import './styles/App.css';
import { auth } from './firebase';
import { onAuthStateChanged } from "firebase/auth";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
            setLoading(false);
        });

        // Cleanup the subscription on unmount
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
        <Router>
            <AuthBackground>
                {isLoggedIn && <NavBar />}
                <Routes>
                    <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/movie/:id" element={isLoggedIn ? <MovieDetail /> : <Navigate to="/login" />} />
                    <Route path="/favorites" element={isLoggedIn ? <FavoritesPage /> : <Navigate to="/login" />} />
                </Routes>
            </AuthBackground>
        </Router>
    );
}

export default App;
