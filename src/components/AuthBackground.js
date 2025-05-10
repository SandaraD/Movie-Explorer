import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/AuthBackground.css';

const AuthBackground = ({ children }) => {
    //get current location of URL
    const location = useLocation();
    //check if the current location is login or signup
    const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

    return (
        //apply auth background class if the current location is login or signup
        <div className={isAuthPage ? "auth-background" : ""}>
            {children}
        </div>
    );
};

export default AuthBackground;
