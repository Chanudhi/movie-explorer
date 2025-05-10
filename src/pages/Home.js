// Home.js - Main landing page showing trending movies and search functionality
import React, { useState } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { useInfiniteQuery } from 'react-query';
import { getTrendingMovies, searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { useInView } from 'react-intersection-observer';

// Home component displays trending movies and search results
const Home = () => {
  // Search query state
  const [searchQuery, setSearchQuery] = useState('');
  // Infinite scroll hook
  const { ref, inView } = useInView();

  // Fetch movies  with infinite scroll
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery(
    ['movies', searchQuery],
    ({ pageParam = 1 }) =>
      searchQuery
        ? searchMovies(searchQuery, pageParam)
        : getTrendingMovies(pageParam),
    {
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
    }
  );

  // Fetch next page when inView (infinite scroll)
  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Handle search bar input
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        Error loading movies. Please try again later.
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Search bar for movies */}
      <SearchBar onSearch={handleSearch} />
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, fontWeight: 700 }}>
        {searchQuery ? 'Search Results' : 'Trending Movies'}
      </Typography>
      {/* Movie grid */}
      <Grid container spacing={3} justifyContent="center" alignItems="flex-start">
        {data?.pages.map((page) =>
          page.results.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))
        )}
      </Grid>
      {/* Infinite scroll loader */}
      <Box
        ref={ref}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          my: 4,
        }}
      >
        {isFetchingNextPage && <CircularProgress />}
      </Box>
    </Container>
  );
};

export default Home;
