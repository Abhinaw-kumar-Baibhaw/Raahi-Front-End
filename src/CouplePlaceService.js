// src/CouplePlaceService.js
import axios from 'axios';

const API_URL = 'http://localhost:8081/api/couples-places'; // Update with your backend API URL

// Fetch all couple places
const getAllCouplePlaces = () => {
  return axios.get(API_URL);
};

// Fetch couple places by category
const getCouplePlacesByCategory = (category) => {
  return axios.get(`${API_URL}/category/${category}`);
};

// Fetch couple places by location and category
const getPlacesByLocationAndCategory = (location, category) => {
  return axios.get(`${API_URL}/places`, {
    params: { location, category },
  });
};

// Fetch couple place by ID
const getCouplePlaceById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export default {
  getAllCouplePlaces,
  getCouplePlacesByCategory,
  getPlacesByLocationAndCategory,
  getCouplePlaceById,
};
