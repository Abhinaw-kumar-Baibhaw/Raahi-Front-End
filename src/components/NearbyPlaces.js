import React, { useState } from "react";

const NearbyPlaces = () => {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(""); // Store the location name
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLocationAndPlaces = () => {
    setLoading(true);
    setError(null);
    setPlaces([]);
    setAddress("");

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          fetchAddress(latitude, longitude); // Get the location name
          fetchPlaces(latitude, longitude);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setError("Unable to retrieve location. Please allow location access.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
    }
  };

  const fetchAddress = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setAddress(data.display_name || "Unknown Location");
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress("Location not found");
    }
  };

  const fetchPlaces = async (lat, lon) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/places/nearby?lat=${lat}&lon=${lon}&radius=1000`
      );
      const data = await response.json();
      setPlaces(data.elements || []);
    } catch (error) {
      console.error("Error fetching places:", error);
      setError("Failed to fetch nearby places.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Nearby Places</h2>
      <button onClick={fetchLocationAndPlaces} disabled={loading}>
        {loading ? "Fetching..." : "Get Nearby Places"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {location && (
        <p>
          <strong>Your Location:</strong> {address || "Fetching location name..."}
        </p>
      )}

      {loading ? (
        <p>Fetching data...</p>
      ) : (
        <>
          {places.length > 0 ? (
            <ul>
              {places.map((place, index) => (
                <li key={index}>{place.tags?.name || "Unnamed Place"}</li>
              ))}
            </ul>
          ) : (
            <p>No places found nearby.</p>
          )}
        </>
      )}
    </div>
  );
};

export default NearbyPlaces;
