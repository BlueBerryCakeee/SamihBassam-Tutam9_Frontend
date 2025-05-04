import axios from 'axios';

// Create axios instance with the deployed backend URL
const api = axios.create({
  baseURL: 'https://samihbassam-tutam9backend.vercel.app',
  headers: {
    'Content-Type': 'application/json'
  },
  // Add timeout to prevent hanging requests
  timeout: 10000
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    // Log requests in development
    console.log(`API Request: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
    
    const userInfo = localStorage.getItem('user');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
      }
    }
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for detailed error logging
api.interceptors.response.use(
  (response) => {
    console.log(`API Response (${response.status}):`, response.data);
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error(`API Error (${error.response.status}):`, error.response.data);
    } else if (error.request) {
      // No response received
      console.error('API Network Error:', error.message);
    } else {
      // Request setup error
      console.error('API Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
