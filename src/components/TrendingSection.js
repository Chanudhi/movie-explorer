import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../services/movieApi";
import { Grid, Typography } from "@mui/material";
import MovieCard from "./MovieCard";

const TrendingSection = () => {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    getTrendingMovies().then((res) => setTrending(res.data.results));
  }, []);

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        🔥 Trending This Week
      </Typography>
      <Grid container spacing={2}>
        {trending.map((movie) => (
          <Grid item xs={6} sm={4} md={3} key={movie.id}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default TrendingSection;
