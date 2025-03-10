import { createContext, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config"

const GeocodeContext = createContext();


export const GeocodeProvider = ({ children }) => {
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [formattedStart, setFormattedStart] = useState("");
  const [formattedDestination, setFormattedDestination] = useState("");
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGeocode = async (address) => {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/geocode/`, {
        params: { address },
      });
      setLoading(false);
      return response.data;
    } catch (err) {
      setError(`Error fetching geocode data. Please try again.`);
      setLoading(false);
      setFormattedStart("")
      setFormattedDestination("")
      return null;
    }
  };

  const fetchReverseGeocode = async (lat, lng) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/reverse-geocode/`, {
        params: { lat, lng },
      });
      return response.data.formatted_address;
    } catch (err) {
      setError("Error fetching reverse geocode");
      return "";
    }
  };

  const fetchDistance = async (startCoords, destCoords) => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/calculate-distance/`, {
        params: {
          lat1: startCoords.latitude,
          lng1: startCoords.longitude,
          lat2: destCoords.latitude,
          lng2: destCoords.longitude,
        },
      });
      setDistance(response.data.distance_km);
      setLoading(false);
    } catch (err) {
      setError("Error fetching distance");
      setLoading(false);
    }
  };

  const handleCalculate = async () => {
    setError("");
    setDistance(null);

    const startData = await fetchGeocode(startLocation);
    const destData = await fetchGeocode(destination);

    if (startData && destData) {
      const startFormatted = await fetchReverseGeocode(startData.latitude, startData.longitude);
      const destFormatted = await fetchReverseGeocode(destData.latitude, destData.longitude);
      
      setFormattedStart(startFormatted);
      setFormattedDestination(destFormatted);
      
      await fetchDistance(startData, destData);
    }
  };

  return (
    <GeocodeContext.Provider
      value={{
        startLocation,
        setStartLocation,
        destination,
        setDestination,
        formattedStart,
        formattedDestination,
        distance,
        loading,
        error,
        handleCalculate,
      }}
    >
      {children}
    </GeocodeContext.Provider>
  );
};

export default GeocodeContext;
