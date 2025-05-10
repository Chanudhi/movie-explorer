// AuthContext.js - Provides authentication context for user login/logout
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
const AuthContext = createContext(null);

// Provider component to wrap the app and provide auth state
export const AuthProvider = ({ children }) => {
  // User state and loading state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check for stored user data
  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function (mock, replace with real API in production)
  const login = (username, password) => {
    // In a real app, this would be an API call
    if (username && password) {
      const userData = { username, id: Date.now() };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 