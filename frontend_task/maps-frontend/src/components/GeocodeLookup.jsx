import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config"

const GeocodeLookup = () => {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchGeocode = async () => {
    try {
      setError("");
      setLoading(true);
      const response = await axios.get(`{API_BASE_URL}/geocode/`, {
        params: { address },
      });
      setLocation(response.data);
      setLoading(false);
    } catch (err) {
      setError("Error fetching geocode data. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Geocode Lookup</h2>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter Address"
      />
      <button onClick={fetchGeocode}>Get Coordinates</button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {location && (
        <div>
          <h3>Location Details:</h3>
          <p><b>Formatted Address:</b> {location.address}</p>
          <p><b>Latitude:</b> {location.latitude}</p>
          <p><b>Longitude:</b> {location.longitude}</p>
        </div>
      )}
    </div>
  );
};

export default GeocodeLookup;
