// Login.js - Page for user login
// Demo login: Use any username and password to log in (no real authentication)
import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

// Login component for user authentication
const Login = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Handle login (mock, stores user in localStorage)
  const handleLogin = () => {
    localStorage.setItem("user", username);
    navigate("/");
  };

  return (
    <Box sx={{ p: 3, maxWidth: 400, mx: "auto" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>Login</Typography>
      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        sx={{ mb: 2 }}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button fullWidth variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
};

export default Login;
