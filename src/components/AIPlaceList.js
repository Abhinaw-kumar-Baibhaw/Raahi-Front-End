import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Card, CardContent, Typography, Box, Grid } from '@mui/material';
import axios from 'axios';

const AIPlaceList = () => {
  const [location, setLocation] = useState('');
  const [days, setDays] = useState('');
  const [loading, setLoading] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [itinerary, setItinerary] = useState('');
  const [error, setError] = useState('');

  // Handle "Generate itinerary" button click
  const handleFilter = () => {
    // Ensure location and days are provided
    if (!location || !days) {
      setError('Please enter both location and number of days');
      return;
    }

    // Reset error and start loading
    setLoading(true);
    setError('');
    setItinerary(''); // Reset the itinerary content

    // Construct URL for backend API call
    const url = `http://localhost:8085/ai/generate?location=${encodeURIComponent(location)}&days=${encodeURIComponent(days)}`;

    // Open a connection using EventSource for Server-Sent Events (SSE)
    const eventSource = new EventSource(url);

    // Listen for incoming messages (streaming data)
    eventSource.onmessage = function (event) {
      const newData = event.data;
      setItinerary((prevItinerary) => prevItinerary + newData);  // Append new data to existing content
    };

    eventSource.onerror = function (error) {
      setError('There was an error fetching the itinerary!');
      setLoading(false);
      eventSource.close();  // Close the connection if there's an error
    };

    eventSource.onopen = function () {
      setLoading(false);  // Loading is done when the stream opens
      setShowItinerary(true);  // Show the itinerary card
    };
  };

  return (
    <div style={{ padding: '30px', fontFamily: '"Roboto", sans-serif', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '3rem', fontWeight: 'bold', color: '#fdb913' }}>
        Choose Location and Days
      </h2>

      {/* Filter Inputs */}
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label="No. of days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </Grid>

      <Box textAlign="center" mt={3}>
        <Button
          onClick={handleFilter}
          variant="contained"
          style={{ backgroundColor: '#fdb913', fontWeight: 'bold', padding: '10px 30px' }}
        >
          Generate Itinerary
        </Button>
      </Box>

      {/* Show Itinerary Card */}
      {showItinerary && (
        <Card
          variant="outlined"
          sx={{
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.89), rgba(250, 234, 152, 0.81))',
            marginTop: '40px',
            padding: '20px',
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div" sx={{ color: '#fdb913', fontWeight: 'bold', marginBottom: '20px' }}>
              Here is your itinerary
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px', color: '#555' }}>
              <strong>Location:</strong> {location}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px', color: '#555' }}>
              <strong>No. of Days:</strong> {days}
            </Typography>

            {/* If loading, show spinner */}
            {loading && (
              <Box textAlign="center" mt={3}>
                <CircularProgress color="primary" />
              </Box>
            )}

            {/* Display itinerary data */}
            {!loading && !error && (
              <Typography variant="body2" sx={{ color: '#555' }}>
                <pre>{itinerary}</pre> {/* Display the accumulated itinerary content */}
              </Typography>
            )}

            {/* Display error message */}
            {error && (
              <Box mt={3} textAlign="center" sx={{ color: 'red' }}>
                <Typography variant="body1">{error}</Typography>
              </Box>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIPlaceList;
