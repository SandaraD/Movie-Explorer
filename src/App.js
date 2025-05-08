import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import FavoritesPage from './pages/FavoritesPage';
import NavBar from './components/NavBar';
import './styles/App.css';

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/movie/:id" element={<MovieDetail />} /> */}
                {/* <Route path="/favorites" element={<FavoritesPage />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
