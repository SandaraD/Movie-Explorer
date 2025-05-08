import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import FavoritesPage from './pages/FavoritesPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NavBar from './components/NavBar';
import './styles/App.css';
import { auth } from './firebase';
import AuthBackground from './components/AuthBackground';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return unSubscribe;
  }, []);


    return (
        <Router>
          <AuthBackground>
            <NavBar />
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


{/* <Routes>
<Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
<Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
<Route path="/movie/:id" element={isLoggedIn ? <MovieDetail /> : <Navigate to="/login" />} />
<Route path="/favorites" element={isLoggedIn ? <FavoritesPage /> : <Navigate to="/login" />} />
</Routes> */}