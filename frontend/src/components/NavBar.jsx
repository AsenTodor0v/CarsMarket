import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem("accessToken"); // Check if user is logged in

    const handleLogout = () => {
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    return (
        <AppBar position="sticky" sx={{ background: "#1976d2" }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold" }}>
                    <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                        🚗 Car Sale
                    </Link>
                </Typography>
                <Box>
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    {isAuthenticated ? (
                        <>
                            <Button color="inherit" component={Link} to="/create-car">
                                Add Car
                            </Button>
                            <Button color="inherit" component={Link} to="/my-cars">
                                My Cars
                            </Button>
                            <Button color="inherit" onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/login">
                                Login
                            </Button>
                            <Button color="inherit" component={Link} to="/register">
                                Register
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
