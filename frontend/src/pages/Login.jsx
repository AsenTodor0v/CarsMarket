import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Grid, Alert } from "@mui/material";
import api from "../api/axios"; // Axios instance for API calls
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // Error state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error on form submission
        try {
            // POST to the Django backend token endpoint
            const response = await api.post("token/", { username, password });

            // Save the access token in localStorage
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);

            navigate("/"); // Redirect to the home page
        } catch (err) {
            setError("Invalid username or password. Please try again.");
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Login to Your Account
            </Typography>
            <form onSubmit={handleSubmit}>
                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    Login
                </Button>
            </form>
            <Grid container sx={{ mt: 2 }}>
                <Grid item xs>
                    <Button onClick={() => navigate("/register")} sx={{ textTransform: "none" }}>
                        Don't have an account? Register
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;
