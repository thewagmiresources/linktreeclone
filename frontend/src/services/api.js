import axios from 'axios';

// API Base URL - reads from environment variable
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost';
const API_URL = `${API_BASE_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error);
    
    // Handle common errors
    if (error.response?.status === 404) {
      console.warn('Resource not found');
    } else if (error.response?.status >= 500) {
      console.error('Server error occurred');
    }
    
    return Promise.reject(error);
  }
);

// API Service Class
class ApiService {
  
  // User Management
  async createAnonymousUser(userData) {
    try {
      const response = await api.post('/users/create-anonymous', userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to create user');
    }
  }

  async getUserByUsername(username) {
    try {
      const response = await api.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch user');
    }
  }

  async updateUser(username, userData) {
    try {
      const response = await api.put(`/users/${username}`, userData);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to update user');
    }
  }

  // Link Management
  async createLink(linkData) {
    try {
      const response = await api.post('/links', linkData);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to create link');
    }
  }

  async updateLink(linkId, linkData) {
    try {
      const response = await api.put(`/links/${linkId}`, linkData);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to update link');
    }
  }

  async deleteLink(linkId) {
    try {
      const response = await api.delete(`/links/${linkId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to delete link');
    }
  }

  // Analytics
  async trackView(data) {
    try {
      const response = await api.post('/analytics/track-view', data);
      return response.data;
    } catch (error) {
      // Don't throw errors for analytics - fail silently
      console.warn('Analytics tracking failed:', error);
      return { success: false };
    }
  }

  async trackClick(data) {
    try {
      const response = await api.post('/analytics/track-click', data);
      return response.data;
    } catch (error) {
      // Don't throw errors for analytics - fail silently
      console.warn('Click tracking failed:', error);
      return { success: false };
    }
  }

  async getAnalytics(userId) {
    try {
      const response = await api.get(`/analytics/${userId}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to fetch analytics');
    }
  }

  // File Upload
  async uploadFile(file, onProgress = null) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await api.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            const percentage = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentage);
          }
        },
      });

      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to upload file');
    }
  }

  // Utility Methods
  async testConnection() {
    try {
      const response = await api.get('/');
      return response.data;
    } catch (error) {
      throw this.handleError(error, 'Failed to connect to API');
    }
  }

  // Error handler
  handleError(error, defaultMessage) {
    if (error.response?.data?.error) {
      return new Error(error.response.data.error);
    } else if (error.message) {
      return new Error(error.message);
    } else {
      return new Error(defaultMessage);
    }
  }

  // Helper method to check if backend is available
  async isBackendAvailable() {
    try {
      await this.testConnection();
      return true;
    } catch {
      return false;
    }
  }
}

// Create singleton instance
const apiService = new ApiService();

// Export individual methods for convenience
export const {
  createAnonymousUser,
  getUserByUsername,
  updateUser,
  createLink,
  updateLink,
  deleteLink,
  trackView,
  trackClick,
  getAnalytics,
  uploadFile,
  testConnection,
  isBackendAvailable
} = apiService;

// Export the service instance
export default apiService;