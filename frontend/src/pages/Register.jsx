import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Grid, Alert } from "@mui/material";
import api from "../api/axios"; // Axios instance for API calls
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null); // Error state
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setLoading(true);

        try {
            // Send the registration data to the backend
            await api.post("/auth/register/", { username, password });

            // After successful registration, log the user in
            const loginResponse = await api.post("token/", { username, password });
            localStorage.setItem("accessToken", loginResponse.data.access);
            localStorage.setItem("refreshToken", loginResponse.data.refresh);

            navigate("/"); // Redirect to home page
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                Create Your Account
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

                <TextField
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </Button>
            </form>
            <Grid container sx={{ mt: 2 }}>
                <Grid item xs>
                    <Button onClick={() => navigate("/login")} sx={{ textTransform: "none" }}>
                        Already have an account? Login
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Register;
