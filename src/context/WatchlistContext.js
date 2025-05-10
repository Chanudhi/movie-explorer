import React, { createContext, useState, useContext, useEffect } from 'react';

const WatchlistContext = createContext(null);

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const isInWatchlist = (movieId) => watchlist.some(movie => movie.id === movieId);
  const addToWatchlist = (movie) => setWatchlist(prev => [...prev, movie]);
  const removeFromWatchlist = (movieId) => setWatchlist(prev => prev.filter(movie => movie.id !== movieId));

  return (
    <WatchlistContext.Provider value={{ watchlist, isInWatchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) throw new Error('useWatchlist must be used within a WatchlistProvider');
  return context;
}; 