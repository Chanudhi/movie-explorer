// ThemeContext.js - Provides theme context for dark/light mode and custom palette
import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import { getTheme } from '../theme';

// Create the context
const ThemeContext = createContext(null);

// Provider component to wrap the app and provide theme state
export const ThemeProvider = ({ children }) => {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Persist dark mode preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Get the theme object based on darkMode
  const theme = getTheme(darkMode ? 'dark' : 'light');

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook to use the Theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
