// Navbar.js - Top navigation bar for the Movie Explorer app
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Menu,
  MenuItem,
  Avatar,
  useTheme
} from '@mui/material';
import { Brightness4, Brightness7, AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme as useCustomTheme } from '../context/ThemeContext';

// Navbar component displays app title, theme toggle, favorites, watchlist, and user menu
const Navbar = () => {
  const { darkMode, toggleDarkMode } = useCustomTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  // Handle user logout
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Open user profile menu
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close user profile menu
  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" sx={{ background: theme.palette.primary.main, boxShadow: '0 0 16px 2px ' + theme.palette.accent.main }}>
      <Toolbar>
        {/* App title, navigates to home */}
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, cursor: 'pointer', color: theme.palette.accent.main, fontWeight: 700 }}
          onClick={() => navigate('/')}
        >
          Movie Explorer
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Theme toggle button */}
          <IconButton
            sx={{ ml: 1, color: theme.palette.accent.main }}
            onClick={toggleDarkMode}
            color="inherit"
          >
            {darkMode ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {/* Favorites and Watchlist buttons (only when logged in) */}
          {user && (
            <>
              <Button sx={{ color: theme.palette.highlight.main, fontWeight: 700 }} onClick={() => navigate('/favorites')}>Go to Favorites</Button>
              <Button sx={{ color: theme.palette.highlight.main, fontWeight: 700 }} onClick={() => navigate('/watchlist')}>Watchlist</Button>
            </>
          )}
          {/* User profile menu or login button */}
          {user ? (
            <>
              <IconButton color="inherit" onClick={handleProfileMenuOpen} sx={{ color: theme.palette.accent.main }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.secondary.main }}>
                  <AccountCircle />
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              >
                <MenuItem onClick={() => { handleProfileMenuClose(); navigate('/profile'); }}>Profile</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button sx={{ color: theme.palette.secondary.main, fontWeight: 700 }} onClick={() => navigate('/login')}>
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 