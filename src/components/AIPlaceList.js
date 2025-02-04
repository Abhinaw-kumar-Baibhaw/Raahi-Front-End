import React, { useState } from 'react';
import { TextField, Button, CircularProgress, Card, CardContent, Typography, Box, Grid } from '@mui/material';

const AIPlaceList = () => {
  const [location, setLocation] = useState('');
  const [days, setDays] = useState('');
  const [loading, setLoading] = useState(false);
  const [showItinerary, setShowItinerary] = useState(false);
  const [itinerary, setItinerary] = useState([]); // Store itinerary as an array of strings
  const [error, setError] = useState('');

  const handleFilter = () => {
    if (!location || !days) {
      setError('Please enter both location and number of days');
      return;
    }

    setLoading(true);
    setError('');
    setItinerary([]); // Reset itinerary
    setShowItinerary(true); // <-- Show the card immediately

    const url = `http://localhost:8085/ai/generate?location=${encodeURIComponent(location)}&days=${encodeURIComponent(days)}`;

    const eventSource = new EventSource(url);
    eventSource.onmessage = function (event) {
      const newData = event.data
        .replace(/\n+/g, ' ')  // Replace multiple newlines with a space
        .replace(/\s{2,}/g, ' ') // Replace multiple spaces with a single space
        .trim(); // Trim leading/trailing spaces
    
      setItinerary((prevItinerary) => {
        const updatedText = prevItinerary.length > 0 ? prevItinerary[prevItinerary.length - 1] + ' ' + newData : newData;
        return [updatedText]; // Ensure it's stored as a single array element
      });
    };
    
    
    eventSource.onerror = (error) => {
      setError();
      setLoading(false);
      eventSource.close();
    };

    eventSource.onopen = () => {
      setLoading(false); // Stop loading when SSE opens
    };
  };

  return (
    <div style={{ padding: '30px', fontFamily: '"Roboto", sans-serif', color: '#fff' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '3rem', fontWeight: 'bold', color: '#fdb913' }}>
        Choose Location and Days
      </h2>

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
            <Typography variant="h5" sx={{ color: '#fdb913', fontWeight: 'bold', marginBottom: '20px' }}>
              Here is your itinerary
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              <strong>Location:</strong> {location}
            </Typography>
            <Typography variant="body1" sx={{ color: '#555' }}>
              <strong>No. of Days:</strong> {days}
            </Typography>

            {loading ? (
              <Box textAlign="center" mt={3}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Box sx={{ mt: 3, p: 2, background: '#fff', borderRadius: '8px' }}>
                {itinerary.length > 0 ? (
                  itinerary.map((item, index) => (
                    <Typography key={index} variant="body2" sx={{ color: '#555', marginBottom: '10px', whiteSpace: 'pre-line' }}>
                      {item}
                    </Typography>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ color: '#888' }}>
                    No itinerary available.
                  </Typography>
                )}
              </Box>
            )}

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
