import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Card, CardContent, CardMedia } from "@mui/material";
import { useParams } from "react-router-dom";  // To access dynamic URL params
import api from "../api/axios";

const CarDetails = () => {
    const { id } = useParams();  // Get the car ID from URL
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await api.get(`/cars/${id}/`);
                setCar(response.data);
            } catch (error) {
                console.error("Error fetching car details:", error);
            }
        };

        fetchCarDetails();
    }, [id]);  // Re-run the effect when the car ID changes

    if (!car) return <div>Loading...</div>;  // Display loading until car data is fetched

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>
                {car.brand} {car.model}
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
                <Card sx={{ display: "flex", maxWidth: 800 }}>
                    <CardMedia
                        component="img"
                        height="400"
                        image={car.image ? car.image : "https://via.placeholder.com/300"}
                        alt={`${car.brand} ${car.model}`}
                        sx={{ objectFit: "cover", width: 400 }}
                    />
                    <CardContent sx={{ flex: 1 }}>
                        <Typography variant="h5" color="primary">
                            ${car.price}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            <strong>Year:</strong> {car.year}
                        </Typography>
                        <Typography variant="body1">
                            <strong>Mileage:</strong> {car.mileage} km
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                            <strong>Description:</strong> {car.description || "No description available."}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Container>
    );
};

export default CarDetails;
