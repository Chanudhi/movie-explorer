import React, { useState } from 'react';
import { Container, Grid, Typography, Box, CircularProgress } from '@mui/material';
import { useInfiniteQuery } from 'react-query';
import { getTrendingMovies, searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { useInView } from 'react-intersection-observer';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { ref, inView } = useInView();

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

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
      <SearchBar onSearch={handleSearch} />
      <Typography variant="h4" component="h1" gutterBottom>
        {searchQuery ? 'Search Results' : 'Trending Movies'}
      </Typography>
      <Grid container spacing={3}>
        {data?.pages.map((page) =>
          page.results.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))
        )}
      </Grid>
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
