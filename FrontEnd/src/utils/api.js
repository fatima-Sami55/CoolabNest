import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 second timeout
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // Debug logging
    console.log('Making API request to:', config.baseURL + config.url);
    console.log('Request config:', config);
    
    const token = localStorage.getItem('token');
    if (token && !config.skipAuth) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for better error handling
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    console.error('API Request Error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - make sure the backend server is running.');
    }
    
    if (error.code === 'ERR_NETWORK') {
      console.error('Network error - make sure the backend server is running on', API_BASE_URL);
      throw new Error('Unable to connect to server. Please check if the backend is running.');
    }
    
    // Handle HTTP errors
    if (error.response) {
      const message = error.response.data?.message || 
                     error.response.data?.errors?.[0]?.msg || 
                     `HTTP error! status: ${error.response.status}`;
      throw new Error(message);
    }
    
    throw error;
  }
);

const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await apiClient({
      url: endpoint,
      method: options.method || 'GET',
      data: options.body,
      headers: options.headers,
      skipAuth: options.skipAuth,
    });
    
    return response;
  } catch (error) {
    throw error;
  }
};

export const authAPI = {
  // Login user
  login: async (email, password) => {
    return await apiRequest('/login', {
      method: 'POST',
      body: { email, password },
      skipAuth: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  // Register user
  register: async (formData) => {
    return await apiRequest('/signup', {
      method: 'POST',
      body: formData, // FormData for file upload
      skipAuth: true,
      // Don't set Content-Type header for FormData - Axios will set it automatically
    });
  },

  // Logout user
  logout: async () => {
    return await apiRequest('/logout', {
      method: 'POST',
    });
  },
};

export default apiRequest;
