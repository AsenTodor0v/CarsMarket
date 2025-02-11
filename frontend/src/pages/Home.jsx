import React, { useState, useEffect } from "react";
import {
    Container, Grid, Card, CardContent, CardMedia, Typography, Button, Pagination
} from "@mui/material";  // <-- Import Pagination here
import { useNavigate } from "react-router-dom";  // Import useNavigate hook
import api from "../api/axios";

const Home = () => {
    const [cars, setCars] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();  // useNavigate hook for navigation

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await api.get(`/cars/?page=${page}`);
                setCars(response.data.results);
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        };

        fetchCars();
    }, [page]);

    const handleChangePage = (event, value) => {
        setPage(value);  // Update the page when the user clicks a different page number
    };

    const handleViewDetails = (carId) => {
        navigate(`/car/${carId}`);  // Navigate to the Car Details page
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
                🚗 Available Cars for Sale
            </Typography>
            <Grid container spacing={3}>
                {cars.map((car) => (
                    <Grid item xs={12} sm={6} md={4} key={car.id}>
                        <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 2 }}>
                            <CardMedia
                                component="img"
                                height="200"
                                image={car.image ? car.image : "https://via.placeholder.com/300"}
                                alt={`${car.brand} ${car.model}`}
                                sx={{ objectFit: "cover" }}
                            />
                            <CardContent>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    {car.brand} {car.model}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Year: {car.year} | Mileage: {car.mileage} km
                                </Typography>
                                <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                                    ${car.price}
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                    color="primary"
                                    onClick={() => handleViewDetails(car.id)}  // Navigate to the car details page
                                >
                                    View Details
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Pagination */}
            <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                color="primary"
                sx={{ mt: 4, display: "flex", justifyContent: "center" }}
            />
        </Container>
    );
};

export default Home;
