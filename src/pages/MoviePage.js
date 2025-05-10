import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi";
import { Box, Typography } from "@mui/material";

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(id).then((res) => setMovie(res.data));
  }, [id]);

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">{movie.title}</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {movie.overview}
      </Typography>
      {movie.videos?.results?.length > 0 && (
        <iframe
          width="100%"
          height="400"
          src={`https://www.youtube.com/embed/${movie.videos.results[0].key}`}
          frameBorder="0"
          allowFullScreen
          title="Trailer"
        ></iframe>
      )}
    </Box>
  );
};

export default MoviePage;
