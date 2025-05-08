import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Link } from '@mui/material';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={5} sx={{ padding: 4, marginTop: 10, borderRadius: "15px", backgroundColor: "#121212" }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ color: "#f50057", fontWeight: "bold" }}>
                    Login
                </Typography>
                <form onSubmit={handleLogin}>
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
                        Login
                    </Button>
                </form>
                <Typography variant="body2" align="center" sx={{ marginTop: 2, color: "#ccc" }}>
                    Don't have an account? <Link href="/signup" sx={{ color: "#f50057" }}>Signup here</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default Login;
