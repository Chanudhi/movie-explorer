# Movie Explorer

A modern, cinematic web app for discovering trending movies, searching, and managing your favorites and watchlist. Inspired by Netflix and IMDb, with a beautiful dark/light theme and a focus on user experience.

## Features
- 🔥 Trending movies (from TMDb API)
- 🔍 Search for movies
- ⭐ Add/remove favorites
- 🎬 Add/remove movies to your watchlist
- 🌓 Dark and light mode (cinematic theme)
- 👤 User login (demo: any username/password)
- 🏆 IMDb-style movie cards
- Profile page with tabs for Favorites and Watchlist
- Responsive, modern UI

## Demo Login
- **Username:** Any value
- **Password:** Any value
- (No real authentication, just enter anything to log in)

## Getting Started

### 1. Clone the repository
```bash
git clone (https://github.com/Chanudhi/movie-explorer)
cd movie-explorer
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root with your TMDb API key:
```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
REACT_APP_TMDB_BASE_URL=https://api.themoviedb.org/3
REACT_APP_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### 4. Start the app
```bash
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000)

## Usage
- **Login:** Enter any username and password.
- **Browse:** See trending movies or search for any movie.
- **Favorites:** Click the heart icon on a movie card to add/remove from favorites.
- **Watchlist:** Click the "Watchlist" button on a movie card to add/remove from your watchlist.
- **Profile:** Click your avatar in the navbar to view your profile, favorites, and watchlist.
- **Theme:** Toggle dark/light mode with the sun/moon icon in the navbar.

## Tech Stack
- React + React Router
- Material-UI (MUI)
- React Query
- TMDb API

## Folder Structure
- `src/components/` - UI components (MovieCard, Navbar, etc.)
- `src/pages/` - Main pages (Home, Profile, Favorites, Login)
- `src/context/` - Context providers (Auth, Theme, Favorites, Watchlist)
- `src/services/` - API service

## License
MIT
