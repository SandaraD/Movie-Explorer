import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/AuthBackground.css';

const AuthBackground = ({ children }) => {
    const location = useLocation();
    const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

    return (
        <div className={isAuthPage ? "auth-background" : ""}>
            {children}
        </div>
    );
};

export default AuthBackground;
