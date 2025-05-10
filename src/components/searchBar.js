// SearchBar.js - Search input for finding movies
import React, { useState } from 'react';
import { Paper, InputBase, IconButton, Box } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

// SearchBar component receives onSearch callback as prop
const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 600, mx: 'auto', my: 2 }}>
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          boxShadow: 3,
        }}
      >
        {/* Search input */}
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          inputProps={{ 'aria-label': 'search movies' }}
        />
        {/* Search button */}
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default SearchBar;
