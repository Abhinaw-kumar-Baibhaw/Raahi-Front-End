import React, { useEffect, useState } from 'react';
import FriendsPlaceService from '../FriendsPlaceService';
import { color } from '@mui/system';

const AIRecommendedPlaces = () => {
  const [recommendedPlaces, setRecommendedPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    FriendsPlaceService.getAIRecommendedItinerary()
      .then((response) => {
        setRecommendedPlaces(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading AI Recommended Places...</p>;
  }

  if (error) {
    return <p>Error fetching recommended places: {error.message}</p>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>AI Recommended Places</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
        {recommendedPlaces.length > 0 ? (
          recommendedPlaces.map((place, index) => (
            <div
              key={index}
              style={{
                width: 'calc(33% - 16px)',
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.89), rgba(250, 234, 152, 0.81))',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                borderRadius: '12px',
                padding: '20px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                marginBottom: '20px',
              }}
            >
              <div style={{ padding: '10px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'rgba(0, 0, 0, 0.64)' }}>
                  {place.name}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#555' }}>{place.description}</p>
                <p style={{color: 'rgba(0, 0, 0, 0.64)'}}><strong>Category:</strong> {place.category}</p>
                <p style={{color: 'rgba(0, 0, 0, 0.64)'}}><strong>Location:</strong> {place.location}</p>
                {place.imageUrl && <img src={place.imageUrl} alt={place.name} style={{ width: '100%', borderRadius: '8px', marginTop: '10px' }} />}
              </div>
            </div>
          ))
        ) : (
          <p>No recommended places available.</p>
        )}
      </div>
    </div>
  );
};

export default AIRecommendedPlaces;
