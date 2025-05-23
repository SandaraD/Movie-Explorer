// Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Link, Alert, Box } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
  // state handling for emaail, password, error msg, success msg
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();//prevent default form submissionn
        setErrorMessage('');
        setSuccessMessage('');

        //check if both fields are filled
        if (!email || !password) {
            setErrorMessage("Please fill in all the fields.");
            return;
        }

        try {
            //firebase login with firebase authentication
            await signInWithEmailAndPassword(auth, email, password);
            setSuccessMessage("Login successful!");
            
            // Redirect to homepage
            setTimeout(() => {
                navigate('/');
            }, 2000);
        } catch (error) {
            console.error("Login Error:", error.message);
            //authentication errors.
            switch (error.code) {
                case 'auth/user-not-found':
                    setErrorMessage("No user found with this email. Please check your email or sign up first.");
                    break;
                case 'auth/wrong-password':
                    setErrorMessage("Incorrect password. Please try again.");
                    break;
                case 'auth/invalid-email':
                    setErrorMessage("Please enter a valid email address.");
                    break;
                default:
                    setErrorMessage("Something went wrong. Please try again.");
            }
        }
    };

    return (
      <Container maxWidth="xs">
        {/* Card for Login form */}
        <Paper
          elevation={5}
          sx={{
            padding: 4,
            marginTop: 10,
            borderRadius: "15px",
            backgroundColor: "#121212",
          }}
        >
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

          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ color: "#f50057", fontWeight: "bold" }}
          >
            Login
          </Typography>

          {/* Success Message */}
          {successMessage && (
            <Alert
              severity="success"
              sx={{
                marginBottom: 2,
                backgroundColor: "#2e7d32",
                color: "#fff",
                borderRadius: "8px",
              }}
            >
              {successMessage}
            </Alert>
          )}

          {/* Error Message */}
          {errorMessage && (
            <Alert
              severity="error"
              sx={{
                marginBottom: 2,
                backgroundColor: "#d32f2f",
                color: "#fff",
                borderRadius: "8px",
              }}
            >
              {errorMessage}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            {/* Email field */}
            <TextField
              fullWidth
              variant="outlined"
              label="Email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{
                backgroundColor: "#333",
                borderRadius: "5px",
                marginBottom: 2,
              }}
              InputLabelProps={{ style: { color: "#ccc" } }}
              InputProps={{ style: { color: "#fff" } }}
            />
            {/* Password filed */}
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
            {/* Login button */}
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              type="submit"
              sx={{ marginTop: 2 }}
            >
              Login
            </Button>
          </form>

          <Typography
            variant="body2"
            align="center"
            sx={{ marginTop: 2, color: "#ccc" }}
          >
            Don't have an account?{" "}
            <Link href="/signup" sx={{ color: "#f50057" }}>
              Signup here
            </Link>
          </Typography>
        </Paper>
      </Container>
    );
};

export default Login;
