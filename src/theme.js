import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            primary: { main: '#1f1f1f' }, // Charcoal Black
            secondary: { main: '#e50914' }, // Netflix Red
            background: {
              default: '#121212',
              paper: '#1f1f1f',
            },
            accent: { main: '#ffffff' }, // White for text
            highlight: { main: '#f5c518' }, // IMDb Yellow
            text: {
              primary: '#ffffff',
              secondary: '#d3d3d3',
            },
            hover: { main: '#292929' },
          }
        : {
            primary: { main: '#ffffff' }, // White
            secondary: { main: '#e50914' }, // Netflix Red
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
            accent: { main: '#1f1f1f' }, // Charcoal Black for text
            highlight: { main: '#f5c518' }, // IMDb Yellow
            text: {
              primary: '#1f1f1f',
              secondary: '#292929',
            },
            hover: { main: '#e3e3e3' },
          }),
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: mode === 'dark'
              ? '#1f1f1f'
              : '#ffffff',
            color: mode === 'dark' ? '#ffffff' : '#1f1f1f',
            boxShadow: mode === 'dark'
              ? '0 0 16px 2px #000a'
              : '0 0 8px 1px #e3e3e3',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            fontWeight: 700,
            textTransform: 'uppercase',
            background: mode === 'dark'
              ? 'linear-gradient(90deg, #e50914 0%, #f5c518 100%)'
              : 'linear-gradient(90deg, #e50914 0%, #f5c518 100%)',
            color: mode === 'dark' ? '#fff' : '#1f1f1f',
            boxShadow: mode === 'dark'
              ? '0 0 8px 2px #000a'
              : '0 0 8px 2px #e3e3e3',
            '&:hover': {
              background: mode === 'dark' ? '#292929' : '#e3e3e3',
              color: '#e50914',
              boxShadow: '0 0 16px 2px #f5c51899',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: mode === 'dark' ? '#1f1f1f' : '#fff',
            border: `1.5px solid ${mode === 'dark' ? '#292929' : '#e3e3e3'}`,
            boxShadow: mode === 'dark'
              ? '0 0 16px 2px #000a'
              : '0 0 8px 1px #e3e3e3',
            color: mode === 'dark' ? '#fff' : '#1f1f1f',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              boxShadow: '0 0 32px 4px #f5c51899',
              borderColor: '#e50914',
              transform: 'scale(1.05)',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: 'Roboto, "Roboto Mono", Arial, sans-serif',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#f5c518' : '#e50914',
            '&:hover': {
              color: '#e50914',
              background: mode === 'dark' ? '#292929' : '#e3e3e3',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            background: mode === 'dark' ? '#1f1f1f' : '#fff',
            color: mode === 'dark' ? '#fff' : '#1f1f1f',
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#fff' : '#1f1f1f',
            background: mode === 'dark' ? '#292929' : '#e3e3e3',
            borderRadius: 8,
          },
        },
      },
    },
    typography: {
      fontFamily: 'Roboto, "Roboto Mono", Arial, sans-serif',
      h4: {
        color: mode === 'dark' ? '#f5c518' : '#e50914',
        fontWeight: 700,
      },
      h5: {
        color: mode === 'dark' ? '#e50914' : '#f5c518',
        fontWeight: 700,
      },
    },
  });
