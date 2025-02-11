import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CarCreate = () => {
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [price, setPrice] = useState("");
    const [year, setYear] = useState("");
    const [mileage, setMileage] = useState("");
    const [description, setDescription] = useState("");
    const [fuelType, setFuelType] = useState(""); // Added
    const [location, setLocation] = useState(""); // Added
    const [make, setMake] = useState(""); // Added
    const [transmission, setTransmission] = useState(""); // Added
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("make", make); // Make
        formData.append("model", model); // Model
        formData.append("price", price); // Price
        formData.append("year", year); // Year
        formData.append("mileage", mileage); // Mileage
        formData.append("fuel_type", fuelType); // Fuel Type
        formData.append("location", location); // Location
        formData.append("transmission", transmission); // Transmission
        formData.append("description", description); // Description
        if (image) formData.append("image", image); // If there's an image, add it

        try {
            const response = await api.post("/cars/create/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token for authentication
                },
            });
            alert("Car created successfully!");
            navigate("/"); // Redirect to the home page after creating the car
        } catch (error) {
            console.error("Error creating car:", error.response ? error.response.data : error.message);
            alert("Error creating car. Please try again.");
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>
                Create a New Car Post
            </Typography>

            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 4,
                    maxWidth: 600,
                    margin: "auto",
                }}
                onSubmit={handleSubmit}
            >
                <TextField
                    label="Brand"
                    variant="outlined"
                    fullWidth
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Model"
                    variant="outlined"
                    fullWidth
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Price"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Year"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Mileage"
                    type="number"
                    variant="outlined"
                    fullWidth
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {/* New Fields for fuel_type, location, make, and transmission */}

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Fuel Type</InputLabel>
                    <Select
                        value={fuelType}
                        onChange={(e) => setFuelType(e.target.value)}
                        label="Fuel Type"
                    >
                        <MenuItem value="Petrol">Gasoline</MenuItem>
                        <MenuItem value="Diesel">Diesel</MenuItem>
                        <MenuItem value="Electric">Electric</MenuItem>
                        <MenuItem value="Hybrid">Hybrid</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    label="Location"
                    variant="outlined"
                    fullWidth
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    sx={{ mb: 2 }}
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Car Make</InputLabel>
                    <Select
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
                        label="Car Make"
                    >
                        <MenuItem value="BMW">BMW</MenuItem>
                        <MenuItem value="Audi">Audi</MenuItem>
                        <MenuItem value="Mercedes">Mercedes</MenuItem>
                        <MenuItem value="Toyota">Toyota</MenuItem>
                        <MenuItem value="Volkswagen">Volkswagen</MenuItem>
                        <MenuItem value="Lexus">Lexus</MenuItem>
                        <MenuItem value="Honda">Honda</MenuItem>
                        <MenuItem value="Hummer">Hummer</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Transmission</InputLabel>
                    <Select
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                        label="Transmission"
                    >
                        <MenuItem value="Manual">Manual</MenuItem>
                        <MenuItem value="Automatic">Automatic</MenuItem>
                    </Select>
                </FormControl>

                <Button variant="outlined" component="label" sx={{ mb: 2 }}>
                    Upload Image
                    <input
                        type="file"
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </Button>

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Create Car
                </Button>
            </Box>
        </Container>
    );
};

export default CarCreate;
