import axios from 'axios';
import { getLocalStorage } from './helpers';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

// Add request interceptor
axios.interceptors.request.use(
  (config) => {
    // Add token to all requests
    const token = getLocalStorage('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axios.interceptors.response.use(
  (response) => {
    // If the response includes a token, save it
    const token = response.data?.token;
    if (token) {
      localStorage.setItem('token', token);
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear token on 401 errors
      localStorage.removeItem('token');
      
      // Don't show unauthorized message for auth check endpoint
      if (!error.config.url.includes('/api/user/auth')) {
        console.log('Unauthorized access');
      }
    }
    return Promise.reject(error);
  }
);

export default axios; 