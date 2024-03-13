
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api/auth'; 

const Api = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { email, password });
      return response.data;
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  },

  register: async (username, email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/register`, { username, email, password });
      return response.data;
    } catch (error) {
      throw new Error('Registration failed');
    }
  },


  fetchFuelAndWeatherData: async (shipValue, formattedDate) => {
    try {
      const url = `${BASE_URL}/fetchFuelAndWeatherData?ship=${shipValue}&date=${formattedDate}`;
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      throw new Error('Error fetching fuel and weather data');
    }
  }
};

export default Api;
