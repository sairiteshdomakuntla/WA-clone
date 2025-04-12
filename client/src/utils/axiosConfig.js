import axios from 'axios';

// Configure axios defaults
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

// Add request interceptor
axios.interceptors.request.use(
  (config) => {
    // No need to manually add token as it's handled by cookies
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Don't show unauthorized message for auth check endpoint
      if (!error.config.url.includes('/api/user/auth')) {
        console.log('Unauthorized access');
      }
    }
    return Promise.reject(error);
  }
);

export default axios; 