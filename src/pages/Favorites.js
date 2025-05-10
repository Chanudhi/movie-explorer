// Favorites.js - Page to display user's favorite movies
import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";

// Favorites page loads favorite movies from localStorage and displays them
const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(saved);
  }, []);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        ⭐ Your Favorite Movies
      </Typography>
      {favorites.length > 0 ? (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item xs={6} sm={4} md={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No favorites added yet.</Typography>
      )}
    </Box>
  );
};

export default Favorites;
