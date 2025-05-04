import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/apiConfig';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Configure axios with token
  useEffect(() => {
    if (user && user.token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [user]);

  // Register user
  const register = async (username, email, password) => {
    try {
      setLoading(true);
      clearError(); // Clear any previous errors
      
      console.log('Registering with API endpoint:', `${api.defaults.baseURL}/api/auth/register`);
      
      const response = await api.post('/api/auth/register', {
        username,
        email,
        password
      });
      
      console.log('Registration successful:', response.data);
      
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      
      // Enhanced error handling
      let errorMsg = 'Registration failed';
      
      if (err.response && err.response.data) {
        errorMsg = err.response.data.message || errorMsg;
        console.error('Server error details:', err.response.data);
      } else if (err.request) {
        errorMsg = 'Network error. Please check your connection.';
        console.error('Network error:', err.request);
      }
      
      setError(errorMsg);
      console.error('Registration error:', errorMsg);
      throw new Error(errorMsg);
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post('/api/auth/login', {
        email,
        password
      });
      
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    clearError
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
