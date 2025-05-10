// MovieCard.js - Displays a single movie card with poster, rating, title, year, favorite, and watchlist actions
import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { Favorite, FavoriteBorder, Star, Add, Check } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import { useWatchlist } from "../context/WatchlistContext";
import { useTheme } from "@mui/material";

// MovieCard component receives a movie object as prop
const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  // Favorite context
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  // Watchlist context
  const { isInWatchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  // Theme for styling
  const theme = useTheme();
  // Poster image URL
  const imageUrl = `${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/w500${movie.poster_path}`;

  // Toggle favorite status
  const handleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  // Toggle watchlist status
  const handleWatchlist = (e) => {
    e.stopPropagation();
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  return (
    <Card
      // Card styling for modern, cinematic look
      sx={{
        maxWidth: 220,
        minWidth: 180,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 3,
        boxShadow: theme.shadows[4],
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        border: `1.5px solid ${theme.palette.mode === 'dark' ? '#292929' : '#e3e3e3'}`,
        '&:hover': {
          boxShadow: '0 0 32px 4px #f5c51899',
          borderColor: '#e50914',
          transform: 'scale(1.05)',
        },
      }}
    >
      {/* Poster and favorite icon */}
      <Box sx={{ position: "relative", cursor: "pointer" }} onClick={() => navigate(`/movie/${movie.id}`)}>
        <CardMedia
          component="img"
          height="320"
          image={imageUrl}
          alt={movie.title}
          sx={{ objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
        />
        {/* Favorite (heart) icon */}
        <IconButton
          onClick={handleFavorite}
          sx={{ position: "absolute", top: 8, right: 8, color: theme.palette.accent.main, background: 'rgba(0,0,0,0.5)' }}
        >
          {isFavorite(movie.id) ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </Box>
      {/* Card content: rating, title, year, watchlist button */}
      <CardContent
        sx={{
          flexGrow: 1,
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          p: 2,
        }}
      >
        {/*  rating */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Star sx={{ color: theme.palette.highlight.main, fontSize: 20, mr: 0.5 }} />
          <Typography variant="body2" sx={{ color: theme.palette.highlight.main, fontWeight: 700 }}>
            {movie.vote_average?.toFixed(1) || "-"}
          </Typography>
        </Box>
        {/* Movie title */}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 0.5 }} noWrap>
          {movie.title}
        </Typography>
        {/* Movie year */}
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, mb: 1 }}>
          {new Date(movie.release_date).getFullYear()}
        </Typography>
        {/* Watchlist button */}
        <Button
          variant={isInWatchlist(movie.id) ? "contained" : "outlined"}
          size="small"
          startIcon={isInWatchlist(movie.id) ? <Check /> : <Add />}
          onClick={handleWatchlist}
          sx={{
            mb: 1,
            background: isInWatchlist(movie.id) ? theme.palette.highlight.main : undefined,
            color: isInWatchlist(movie.id) ? theme.palette.primary.main : theme.palette.text.primary,
            borderColor: theme.palette.highlight.main,
            fontWeight: 700,
            '&:hover': {
              background: theme.palette.highlight.main,
              color: theme.palette.primary.main,
            },
            width: '100%',
            borderRadius: 2,
          }}
        >
          {isInWatchlist(movie.id) ? "In Watchlist" : "Watchlist"}
        </Button>
       </CardContent>
    </Card>
  );
};

export default MovieCard;
