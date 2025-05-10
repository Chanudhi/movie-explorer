import React from 'react';
import {
  Box,
  Typography,
  Avatar,
  Divider,
  Grid,
  Paper,
} from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import { useTheme } from '../context/ThemeContext';

const Profile = () => {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const { theme } = useTheme();

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 4 },
        maxWidth: 1000,
        mx: 'auto',
        minHeight: '80vh',
        color: theme === 'dark' ? '#fff' : '#000',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          backgroundColor: theme === 'dark' ? '#1e1e1e' : '#f9f9f9',
          borderRadius: 3,
        }}
      >
        {/* User Info */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar
            sx={{
              width: 64,
              height: 64,
              fontSize: 28,
              bgcolor: theme === 'dark' ? '#555' : 'primary.main',
              mr: 2,
            }}
          >
            {user?.username?.[0]?.toUpperCase() || '?'}
          </Avatar>
          <Box>
            <Typography variant="h5">{user?.username || 'User'}</Typography>
            <Typography variant="body2" sx={{ color: theme === 'dark' ? '#aaa' : 'text.secondary' }}>
              {user?.email || 'user@email.com'}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Favorites Section */}
        <Typography variant="h6" gutterBottom>
          ⭐ Your Favorite Movies
        </Typography>
        {favorites.length > 0 ? (
          <Grid container spacing={2}>
            {favorites.map((movie) => (
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
              color: theme === 'dark' ? '#888' : 'text.secondary',
            }}
          >
            You haven’t added any favorites yet.
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default Profile;
