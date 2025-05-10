import React, { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext(null);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const isFavorite = (movieId) => {
    return favorites.some(movie => movie.id === movieId);
  };

  const addFavorite = (movie) => {
    setFavorites(prev => [...prev, movie]);
  };

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

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
