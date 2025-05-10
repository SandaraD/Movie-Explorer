// Signup.js
import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Link, Alert, Box } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        if (!email || !password) {
            setErrorMessage("Please fill in all the fields.");
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setSuccessMessage("Account created successfully! Redirecting to homepage...");
            
            // Redirect after 2 seconds
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error("Signup Error:", error.message);
            switch (error.code) {
                case 'auth/email-already-in-use':
                    setErrorMessage("The email address is already in use by another account.");
                    break;
                case 'auth/invalid-email':
                    setErrorMessage("Please enter a valid email address.");
                    break;
                case 'auth/weak-password':
                    setErrorMessage("Password should be at least 6 characters.");
                    break;
                default:
                    setErrorMessage("Something went wrong. Please try again later.");
            }
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={5} sx={{ padding: 4, marginTop: 10, borderRadius: "15px", backgroundColor: "#121212" }}>
            <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 3,
            }}
          >
            <MovieFilterIcon
              fontSize="large"
              sx={{ color: "#f50057", marginBottom: 1 }}
            />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#fff",
                letterSpacing: "1px",
                textAlign: "center",
              }}
            >
              Movie Explorer
            </Typography>
          </Box>
                <Typography variant="h4" gutterBottom align="center" sx={{ color: "#f50057", fontWeight: "bold" }}>
                    Signup
                </Typography>

                {/* Success Message */}
                {successMessage && (
                    <Alert 
                        severity="success" 
                        sx={{ marginBottom: 2, backgroundColor: "#2e7d32", color: "#fff", borderRadius: "8px" }}
                    >
                        {successMessage}
                    </Alert>
                )}

                {/* Error Message */}
                {errorMessage && (
                    <Alert 
                        severity="error" 
                        sx={{ marginBottom: 2, backgroundColor: "#d32f2f", color: "#fff", borderRadius: "8px" }}
                    >
                        {errorMessage}
                    </Alert>
                )}

                <form onSubmit={handleSignup}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Email"
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ backgroundColor: "#333", borderRadius: "5px", marginBottom: 2 }}
                        InputLabelProps={{ style: { color: "#ccc" } }}
                        InputProps={{ style: { color: "#fff" } }}
                    />
                    <TextField
                        fullWidth
                        variant="outlined"
                        label="Password"
                        type="password"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{ backgroundColor: "#333", borderRadius: "5px" }}
                        InputLabelProps={{ style: { color: "#ccc" } }}
                        InputProps={{ style: { color: "#fff" } }}
                    />
                    <Button fullWidth variant="contained" color="secondary" type="submit" sx={{ marginTop: 2 }}>
                        Signup
                    </Button>
                </form>
                
                <Typography variant="body2" align="center" sx={{ marginTop: 2, color: "#ccc" }}>
                    Already have an account? <Link href="/login" sx={{ color: "#f50057" }}>Login here</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Signup;
