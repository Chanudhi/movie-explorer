import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Chip,
  Rating,
  Paper,
  Divider,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getMovieDetails } from '../services/api';

const MovieDetails = () => {
  const { movieId } = useParams();
  const { data: movie, isLoading, error } = useQuery(['movie', movieId], () => getMovieDetails(movieId));

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">Error loading movie details</Typography>;
  if (!movie) return null;

  const trailer = movie.videos?.results?.find(video => video.type === 'Trailer');
  const imageUrl = `${process.env.REACT_APP_TMDB_IMAGE_BASE_URL}/original${movie.backdrop_path}`;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ overflow: 'hidden' }}>
        <Box
          sx={{
            height: 400,
            backgroundImage: `url(${imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
            },
          }}
        />
        <Box sx={{ p: 3 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            {movie.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
            <Typography variant="body1" sx={{ ml: 1 }}>
              ({movie.vote_average.toFixed(1)})
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            {movie.genres?.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                sx={{ mr: 1, mb: 1 }}
              />
            ))}
          </Box>
          <Typography variant="body1" paragraph>
            {movie.overview}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Cast
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {movie.credits?.cast?.slice(0, 5).map((actor) => (
                  <Chip
                    key={actor.id}
                    label={`${actor.name} as ${actor.character}`}
                    variant="outlined"
                  />
                ))}
              </Box>
            </Grid>
            {trailer && (
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  Trailer
                </Typography>
                <Box
                  component="iframe"
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  sx={{
                    width: '100%',
                    height: 315,
                    border: 0,
                  }}
                  allowFullScreen
                />
              </Grid>
            )}
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default MovieDetails; 