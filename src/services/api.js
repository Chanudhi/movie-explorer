// api.js - Service for interacting with the TMDb API
import axios from 'axios';

// Create an axios instance with base URL and API key
const api = axios.create({
  baseURL: process.env.REACT_APP_TMDB_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

// Fetch trending movies (weekly)
export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await api.get('/trending/movie/week', { params: { page } });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch trending movies');
  }
};

// Search for movies by query
export const searchMovies = async (query, page = 1) => {
  try {
    const response = await api.get('/search/movie', {
      params: { query, page },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to search movies');
  }
};

// Fetch detailed info for a single movie (including credits and videos)
export const getMovieDetails = async (movieId) => {
  try {
    const [movieResponse, creditsResponse, videosResponse] = await Promise.all([
      api.get(`/movie/${movieId}`),
      api.get(`/movie/${movieId}/credits`),
      api.get(`/movie/${movieId}/videos`),
    ]);

    return {
      ...movieResponse.data,
      credits: creditsResponse.data,
      videos: videosResponse.data,
    };
  } catch (error) {
    throw new Error('Failed to fetch movie details');
  }
};

export default api; 