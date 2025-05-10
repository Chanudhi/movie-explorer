import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Rating,
  Box,
} from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useTheme } from "../context/ThemeContext";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { theme } = useTheme();
  const imageUrl = `${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`;

  const handleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
        },
        backgroundColor: theme === "dark" ? "#333" : "#fff",
        position: "relative",
        color: theme === "dark" ? "#fff" : "#000",
      }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <CardMedia
        component="img"
        height="500"
        image={imageUrl}
        alt={movie.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          backgroundColor: theme === "dark" ? "#222" : "#fff",
          color: theme === "dark" ? "#fff" : "#000",
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          noWrap
          sx={{ color: theme === "dark" ? "#fff" : "#000" }}
        >
          {movie.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: theme === "dark" ? "#ccc" : "text.secondary" }}
        >
          {new Date(movie.release_date).getFullYear()}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Rating
            value={movie.vote_average / 2}
            precision={0.5}
            readOnly
            size="small"
            sx={{ color: theme === "dark" ? "#ffd700" : undefined }}
          />
          <Typography
            variant="body2"
            sx={{ ml: 1, color: theme === "dark" ? "#ffd700" : "text.secondary" }}
          >
            ({movie.vote_average.toFixed(1)})
          </Typography>
        </Box>
      </CardContent>
      <IconButton
        onClick={handleFavorite}
        sx={{ position: "absolute", top: 10, right: 10 }}
        color={isFavorite(movie.id) ? "error" : "inherit"}
      >
        {isFavorite(movie.id) ? <Favorite /> : <FavoriteBorder />}
      </IconButton>
    </Card>
  );
};

export default MovieCard;
