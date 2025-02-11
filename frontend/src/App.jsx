import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import CarDetail from "./pages/Details";
import CarCreate from "./pages/Create";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/create-car" element={<CarCreate />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
