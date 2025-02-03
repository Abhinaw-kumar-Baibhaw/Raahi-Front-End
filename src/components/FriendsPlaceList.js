import React, { useState } from 'react';
import FriendsPlaceService from '../FriendsPlaceService';
import { TextField, Button, CircularProgress, Card, CardContent, Typography, Box, MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';

const FriendsPlaceList = () => {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilter = () => {
    setLoading(true); 
    FriendsPlaceService.getPlacesByLocationAndCategory(location, category)
      .then((response) => {
        setFilteredPlaces(response.data); // Set the filtered places
        setLoading(false); // Stop loading once data is fetched
      })
      .catch((error) => {
        console.error('There was an error fetching the filtered places!', error);
        setLoading(false); // Stop loading on error
      });
  };

  return (
    <div style={{
      padding: '30px', 
      background: 'url(public\\images\\header1.jpg) no-repeat center center fixed', 
      backgroundSize: 'cover', 
      fontFamily: '"Roboto", sans-serif',
      color: '#fff',
    }}>
      {/* Header Section */}
      <h2 style={{
        textAlign: 'center', 
        marginBottom: '40px', 
        fontSize: '3rem', 
        fontWeight: 'bold', 
        textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)',
        color: 'rgb(255, 181, 9)',
      }}>
        Filter Friends Places
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
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.51)', 
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#fdb913', 
                },
                '&:hover fieldset': {
                  borderColor: '#fdb913',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'black',
              },
            }}
          />
        </Grid>

        {/* Category Dropdown */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth margin="normal" variant="outlined" sx={{ borderRadius: '12px' }}>
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              label="Category"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.51)', 
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#fdb913', 
                  },
                  '&:hover fieldset': {
                    borderColor: '#fdb913', 
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'black', 
                },
              }}
            >
              <MenuItem value="RESTAURANT">RESTAURANT</MenuItem>
              <MenuItem value="PARK">PARK</MenuItem>
              <MenuItem value="MUSEUM">MUSEUM</MenuItem>
              <MenuItem value="ART_GALLERY">ART GALLERY</MenuItem>
              <MenuItem value="CAFE">CAFE</MenuItem>
              <MenuItem value="CLUB">CLUB</MenuItem>
              <MenuItem value="ARCADE">ARCADE</MenuItem>
              <MenuItem value="HOTEL">HOTEL</MenuItem>
              <MenuItem value="GYM">GYM</MenuItem>
              <MenuItem value="LIBRARY">LIBRARY</MenuItem>
              <MenuItem value="STADIUM">STADIUM</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box textAlign="center" mt={3}>
        <Button 
          onClick={handleFilter} 
          variant="contained" 
          style={{
            backgroundColor: 'rgb(231, 151, 3)', 
            fontWeight: 'bold',
            padding: '10px 30px',
            fontSize: '1rem',
            borderRadius: '8px',
            transition: 'background-color 0.3s',
            color: 'black'
          }} 
          sx={{
            '&:hover': {
              backgroundColor: '#fdb913',
            }
          }}
        >
          Filter
        </Button>
      </Box>

      {/* Loading Indicator */}
      {loading && <Box textAlign="center" mt={3}><CircularProgress color="primary" /></Box>}

      {/* Display Filtered Places */}
      <div>
        <h3 style={{
          textAlign: 'center', 
          marginTop: '40px', 
          fontSize: '2rem', 
          fontWeight: 'bold',
          color: '#fdb913',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
        }}>
          Filtered Places
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
          {filteredPlaces.length > 0 ? (
            filteredPlaces.map((place) => (
              <Card 
                variant="outlined" 
                sx={{
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', 
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.89), rgba(250, 234, 152, 0.81))',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  width: 'calc(33% - 16px)', 
                  '&:hover': {
                    transform: 'scale(1.05)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)',
                  }
                }}
                key={place.id}
              >
                <CardContent sx={{ padding: '20px' }}>
                  <Typography variant="h6" component="div" sx={{ color: 'rgba(0, 0, 0, 0.64)', fontWeight: 'bold' }}>
                    {place.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ color: '#555', marginTop: '5px' }}>
                    {place.category}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ color: '#555', marginTop: '5px' }}>
                    {place.location}
                  </Typography>
                </CardContent>
              </Card>
            ))
          ) : (
            !loading && <p style={{ textAlign: 'center', color: 'white', fontSize: '1.2rem' }}>No places found for the given filter criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPlaceList;
