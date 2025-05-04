import axios from 'axios';

// Create an axios instance with the Vercel backend URL
const api = axios.create({
  baseURL: 'https://samihbassam-tutam9backend.vercel.app',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add authentication headers to requests
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log friendly error messages for debugging
    if (error.response) {
      console.error('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
