import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_TMDB_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_TMDB_API_KEY,
  },
});

export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await api.get('/trending/movie/week', { params: { page } });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch trending movies');
  }
};

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