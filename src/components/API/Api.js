// Api.js (within the components/API directory)

import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000/api/auth/login'; // Replace with your backend URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Adjust timeout as needed
  headers: {
    'Content-Type': 'application/json',
  },
});

const Api = {
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/login', credentials);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  fetchDashboardData: async () => {
    try {
      const response = await axiosInstance.get('/dashboard-data');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add more functions for other API endpoints...
};

export default Api;
