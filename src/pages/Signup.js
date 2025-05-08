import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography, Link } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Container maxWidth="xs">
            <Paper elevation={5} sx={{ padding: 4, marginTop: 10, borderRadius: "15px", backgroundColor: "#121212" }}>
                <Typography variant="h4" gutterBottom align="center" sx={{ color: "#f50057", fontWeight: "bold" }}>
                    Signup
                </Typography>
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
