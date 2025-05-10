// WatchlistContext.js - Provides context for managing user's movie watchlist
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const WatchlistContext = createContext(null);

// Provider component to wrap the app and provide watchlist state
export const WatchlistProvider = ({ children }) => {
  // Initialize watchlist from localStorage
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Persist watchlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Check if a movie is in the watchlist
  const isInWatchlist = (movieId) => watchlist.some(movie => movie.id === movieId);
  // Add a movie to the watchlist
  const addToWatchlist = (movie) => setWatchlist(prev => [...prev, movie]);
  // Remove a movie from the watchlist
  const removeFromWatchlist = (movieId) => setWatchlist(prev => prev.filter(movie => movie.id !== movieId));

  return (
    <WatchlistContext.Provider value={{ watchlist, isInWatchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

// Custom hook to use the Watchlist context
export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) throw new Error('useWatchlist must be used within a WatchlistProvider');
  return context;
}; 