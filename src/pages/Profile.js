// Profile.js - User profile page with tabbed view for Favorites and Watchlist
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Grid,
  Paper,
  Button,
  ButtonGroup,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';
import { useTheme } from '@mui/material';

// Profile component displays user info and lets user toggle between Favorites and Watchlist
const Profile = ({ showWatchlist }) => {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const { watchlist } = useWatchlist();
  const theme = useTheme();
  // Tab state: 'favorites' or 'watchlist'
  const [tab, setTab] = useState(showWatchlist ? 'watchlist' : 'favorites');

  // Determine which movies to show and section title
  const moviesToShow = tab === 'watchlist' ? watchlist : favorites;
  const sectionTitle = tab === 'watchlist' ? '🎬 Your Watchlist' : '⭐ Your Favorite Movies';
  const emptyText = tab === 'watchlist'
    ? "You haven't added any movies to your watchlist yet."
    : "You haven't added any favorites yet.";

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: 1000,
        mx: 'auto',
        minHeight: '80vh',
        color: theme.palette.text.primary,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          backgroundColor: theme.palette.background.paper,
          borderRadius: 3,
        }}
      >
        {/* User Info Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              fontSize: 28,
              bgcolor: theme.palette.secondary.main,
              mr: 2,
            }}
          >
            {user?.username?.[0]?.toUpperCase() || '?'}
          </Avatar>
          <Box>
            <Typography variant="h5">{user?.username || 'User'}</Typography>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
              {user?.email || 'user@email.com'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Tab Toggle for Favorites/Watchlist */}
        <ButtonGroup sx={{ mb: 3 }}>
          <Button
            variant={tab === 'favorites' ? 'contained' : 'outlined'}
            onClick={() => setTab('favorites')}
            sx={{ fontWeight: 700 }}
          >
            Favorites
          </Button>
          <Button
            variant={tab === 'watchlist' ? 'contained' : 'outlined'}
            onClick={() => setTab('watchlist')}
            sx={{ fontWeight: 700 }}
          >
            Watchlist
          </Button>
        </ButtonGroup>

        {/* Section for Favorites or Watchlist */}
        <Typography variant="h6" gutterBottom>
          {sectionTitle}
        </Typography>
        {moviesToShow.length > 0 ? (
          <Grid container spacing={2} justifyContent="center" alignItems="flex-start">
            {moviesToShow.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="body1"
            sx={{
              mt: 2,
              fontStyle: 'italic',
              color: theme.palette.text.secondary,
            }}
          >
            {emptyText}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
