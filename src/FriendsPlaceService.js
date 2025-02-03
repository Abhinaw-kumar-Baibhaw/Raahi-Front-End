
import axios from 'axios';

const API_URL = 'http://localhost:8083/api/friends-places'; 


const getAllFriendsPlaces = () => {
  return axios.get(API_URL);
};


const getFriendsPlacesByCategory = (category) => {
  return axios.get(`${API_URL}/category/${category}`);
};

const getPlacesByLocationAndCategory = (location, category) => {
  return axios.get(`${API_URL}/places`, {
    params: { location, category },
  });
};


const getFriendsPlaceById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};


const getAIRecommendedItinerary = () => {
  return axios.get(`${API_URL}/recommendations/batch`);
};

export default {
  getAllFriendsPlaces,
  getFriendsPlacesByCategory,
  getPlacesByLocationAndCategory,
  getFriendsPlaceById,
  getAIRecommendedItinerary,  
};
