// FavoritesContext.js - Provides context for managing user's favorite movies
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const FavoritesContext = createContext(null);

// Provider component to wrap the app and provide favorites state
export const FavoritesProvider = ({ children }) => {
  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  // Persist favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Check if a movie is a favorite
  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  // Add a movie to favorites
  const addFavorite = (movie) => {
    setFavorites(prev => [...prev, movie]);
  };

  // Remove a movie from favorites
  const removeFavorite = (movieId) => {
    setFavorites(prev => prev.filter(movie => movie.id !== movieId));
  };

  const value = {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use the Favorites context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
