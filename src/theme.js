import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#0f0c29", // Dark Indigo
      },
      secondary: {
        main: "#ff0080", // Neon Pink
      },
      background: {
        default: "#1a1a2e", // Deep background
        paper: mode === "dark" ? "#22223b" : "#fff",
      },
      accent: {
        main: "#00ffff", // Cyan
      },
      highlight: {
        main: "#f0e130", // Gold
      },
      text: {
        primary: mode === "dark" ? "#fff" : "#0f0c29",
        secondary: mode === "dark" ? "#00ffff" : "#ff0080",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: "linear-gradient(90deg, #0f0c29 0%, #302b63 50%, #ff0080 100%)",
            boxShadow: "0 0 16px 2px #00ffff99",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            fontWeight: 700,
            textTransform: "uppercase",
            background: "linear-gradient(90deg, #ff0080 0%, #00ffff 100%)",
            color: "#0f0c29",
            boxShadow: "0 0 8px 2px #00ffff55",
            '&:hover': {
              background: "#282c34",
              color: "#f0e130",
              boxShadow: "0 0 16px 2px #f0e13099",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: "#1a1a2e",
            border: "1.5px solid #00ffff",
            boxShadow: "0 0 16px 2px #ff008055",
            color: "#fff",
            transition: "transform 0.2s, box-shadow 0.2s",
            '&:hover': {
              boxShadow: "0 0 32px 4px #00ffff99",
              borderColor: "#f0e130",
              transform: "scale(1.05)",
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: 'Orbitron, "Roboto Mono", monospace',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: "#00ffff",
            '&:hover': {
              color: "#f0e130",
              background: "#282c34",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            background: "#22223b",
            color: "#fff",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            color: "#00ffff",
            background: "#282c34",
            borderRadius: 8,
          },
        },
      },
    },
    typography: {
      fontFamily: 'Orbitron, "Roboto Mono", monospace',
      h4: {
        color: "#ff0080",
        textShadow: "0 0 8px #00ffff, 0 0 2px #f0e130",
      },
      h5: {
        color: "#00ffff",
        textShadow: "0 0 8px #ff0080, 0 0 2px #f0e130",
      },
    },
  });
