import axios from 'axios';

// Always use the Railway backend URL
const baseURL = 'https://samihbassam-tutam9-backend.railway.app';

// Create axios instance with configuration
const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Ensure credentials are included for cross-origin requests if needed
  withCredentials: false,
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user?.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging connection issues
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    } else if (error.request) {
      console.error('No response received. Network issue or CORS problem.');
    }
    return Promise.reject(error);
  }
);

export default api;
