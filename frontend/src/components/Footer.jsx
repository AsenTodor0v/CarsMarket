import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            sx={{
                backgroundColor: "#1976d2",
                color: "white",
                textAlign: "center",
                py: 2,
                mt: 5,
            }}
        >
            <Typography variant="body2">
                © {new Date().getFullYear()} Car Sale | All Rights Reserved
            </Typography>
        </Box>
    );
};

export default Footer;
