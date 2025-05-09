// src/context/ThemeContext.js
import React, { createContext, useContext, useState, useMemo } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { grey, deepOrange } from '@mui/material/colors';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeContextProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const theme = useMemo(() => 
        createTheme({
            palette: {
                mode: darkMode ? 'dark' : 'light',
                ...(darkMode ? {
                    primary: {
                        main: "#f50057",
                    },
                    background: {
                        default: grey[800],
                        paper: grey[600],
                    },
                    text: {
                        primary: "#ffffff",
                        secondary: "#cccccc",
                    },
                } : {
                    primary: {
                        main: "#f50057",
                    },
                    background: {
                        default: "#ffffff",
                        paper: "#f5f5f5",
                    },
                    text: {
                        primary: "#000000",
                        secondary: "#555555",
                    },
                })
            },
            typography: {
                fontFamily: 'Arial, sans-serif',
                h3: {
                    fontWeight: 700,
                    color: darkMode ? "#ffffff" : "#000000",
                },
                h4: {
                    fontWeight: 700,
                    color: darkMode ? "#ffffff" : "#000000",
                },
                subtitle1: {
                    fontStyle: 'italic',
                    color: darkMode ? "#ff4081" : "#f50057",
                },
                body1: {
                    color: darkMode ? "#ffffff" : "#000000",
                    lineHeight: 1.6,
                },
                body2: {
                    color: darkMode ? "#cccccc" : "#555555",
                },
                caption: {
                    color: darkMode ? "#bbbbbb" : "#888888",
                },
            },
        }), [darkMode]);

    const toggleTheme = () => setDarkMode(!darkMode);

    return (
        <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
export { ThemeContext };