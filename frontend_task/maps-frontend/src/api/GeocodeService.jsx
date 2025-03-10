import axios from "axios";

import API_BASE_URL from "..config/"

export const fetchGeocode = async (address) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/geocode/`, { params: { address } });
    return response.data;
  } catch (error) {
    throw new Error("Geocode API request failed.");
  }
};

export const fetchDistance = async (startAddress, destinationAddress) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/calculate-distance/`, {
      params: { start: startAddress, destination: destinationAddress },
    });
    return response.data.distance_km;
  } catch (error) {
    throw new Error("Distance API request failed.");
  }
};
