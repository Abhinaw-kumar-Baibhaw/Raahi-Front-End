import React, { useState } from 'react';
import { Box, Typography, Paper, Grid, Avatar, Button, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import CouplePlaceList from './CouplePlaceList';  // Import the CouplePlaceList component
import FriendsPlaceList from './FriendsPlaceList';  // Import the FriendsPlaceList component
import FriendsPlaceService from '../FriendsPlaceService';
import AIRecommendedPlaces from './AIRecommendedPlaces'; 
import AIPlaceList from './AIPlaceList'; // Import the AIRecommendedPlaces component

// Create a custom style for the section container
const AboutContainer = styled(Paper)(({ theme }) => ({
  padding: '60px 40px',
  backgroundColor: 'transparent',
  boxShadow: '0 16px 48px rgba(0, 0, 0, 0.1)',
  borderRadius: '20px',
  marginTop: '5vh',
  position: 'relative',
  transition: 'all 0.3s ease-in-out',
  color: 'white', // Apply white color to the whole section
  [theme.breakpoints.down('md')]: {
    padding: '40px 20px',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '2.5rem',
  color: 'white', // White text for the title
  textAlign: 'center',
  marginBottom: '30px',
  fontFamily: 'Roboto, sans-serif',
  [theme.breakpoints.down('md')]: {
    fontSize: '2rem',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  marginBottom: '20px',
  lineHeight: '1.8',
  fontSize: '1.1rem',
  color: 'white', // White text for the description
  textAlign: 'center',
  maxWidth: '800px',
  marginLeft: 'auto',
  marginRight: 'auto',
  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
}));

const HighlightText = styled(Typography)(({ theme }) => ({
  color: '#3f51b5', // Highlight text color (blue)
  fontWeight: 'bold',
  marginBottom: '20px',
  display: 'inline',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.1rem',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: '30px',
  zIndex: 1,
  position: 'relative',
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 100,
  height: 100,
  backgroundColor: 'rgba(51, 37, 4, 0.76)',
  boxShadow: '0 6px 18px rgba(0, 0, 0, 0)',
  fontSize: '36px',
  color: 'white',
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    width: 80,
    height: 80,
  },
}));

const ButtonWrapper = styled(Box)(({ theme }) => ({
  marginTop: '30px',
  display: 'flex',
  justifyContent: 'center',
}));

const CardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
  marginTop: '30px',
  flexWrap: 'wrap',
}));

const InfoCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'rgba(253, 187, 19, 0.21)',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center',
  width: '45%',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
  },
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'all 0.3s ease-in-out',
  },
}));

const AboutSection = () => {
  const [showCards, setShowCards] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null); // State to track the selected category
  const [showItineraryOptions, setShowItineraryOptions] = useState(false); // State to track whether itinerary options are shown
  const [showCouplePlaces, setShowCouplePlaces] = useState(false); // To control showing CouplePlaceList
  const [showFriendsPlaces, setShowFriendsPlaces] = useState(false); // To control showing FriendsPlaceList
  const [friendsAIRecommendedPlaces, setFriendsAIRecommendedPlaces] = useState(false);

  const [showAIPlaceList, setShowAIPlaceList] = useState(false);

  // Handle the button click to toggle cards visibility
  const handleGetStartedClick = () => {
    setShowCards(!showCards);
  };

  // Handle category click and show itinerary options
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowItineraryOptions(true); // Show itinerary options when a category is clicked
  };


  const handleAIRecommendationClick = () => {
    setShowAIPlaceList(true); // Show the AI place list when the button is clicked
  };

  // Handle itinerary selection
  const handleItinerarySelection = (type) => {
    if (type === 'manual') {
      if (selectedCategory === 'Couple') {
        setShowCouplePlaces(true); // Show Couple Place List when selecting manual itinerary for Couple
      } else if (selectedCategory === 'Friends') {
        setShowFriendsPlaces(true); // Show Friends Place List when selecting manual itinerary for Friends
      }
    }
    else if (type === 'ai') {
      setShowCouplePlaces(false);
      setShowFriendsPlaces(false);
      if (selectedCategory === 'Friends') {
        FriendsPlaceService.getAIRecommendedItinerary()
          .then((response) => {
            setFriendsAIRecommendedPlaces(response.data); // Update state with AI places for Friends
          })
          .catch((error) => {
            console.error('Error fetching AI recommendations for Friends:', error);
          });
      }
    }
  };

  return (
    <AboutContainer>
      {/* Header Section */}
      <IconWrapper>
        <StyledAvatar>
          <Typography variant="h5">RAAHI</Typography>
        </StyledAvatar>
      </IconWrapper>

      <Title variant="h4" style={{ color: 'rgb(253, 185, 19)' }}>
        Welcome to RAAHI
      </Title>

      {/* Content Section */}
      <Description variant="body1">
        Our website is dedicated to helping couples plan the perfect trip! Whether you're looking for a
        <HighlightText style={{ color: '#fdb913' }}> romantic getaway</HighlightText>, an adventure-packed vacation, or just a peaceful retreat, we have something for everyone.
      </Description>

      <Description variant="body1">
        Explore personalized itineraries that allow you to choose your favorite destinations, categories, and experiences.
        You can easily manage your trip with our intuitive planning tools.
        Save your favorite places, share your plans, and get inspired by new recommendations every time you visit!
      </Description>

      <Description variant="body1">
        With a wide range of destinations and activities to choose from, you’ll never run out of amazing experiences to explore.
        <HighlightText style={{ color: '#fdb913' }}> Start planning your dream vacation today!</HighlightText>
      </Description>

      {/* Action Button */}
      <ButtonWrapper>
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{
            borderRadius: '30px',
            padding: '10px 20px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'rgba(51, 37, 4, 0.76)',
            '&:hover': {
              backgroundColor: '#fdb913',
              color: 'black',
            },
          }}
          onClick={handleGetStartedClick}
        >
          Get Started
        </Button>
      </ButtonWrapper>

      {/* Cards Section */}
      {showCards && (
        <CardWrapper>
          {['Family', 'Couple', 'Friends', 'Individual'].map((category, index) => (
            <InfoCard key={index} onClick={() => handleCategoryClick(category)}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: '10px', color: 'white' }}>
                  {category}
                </Typography>
                <Typography variant="body2" sx={{ color: 'white' }}>
                  Plan your perfect {category.toLowerCase()} trip with tailored recommendations and destinations.
                </Typography>
              </CardContent>
            </InfoCard>
          ))}
        </CardWrapper>
      )}

      {/* Itinerary Options */}
      {showItineraryOptions && selectedCategory && (
        <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 'bold', marginBottom: '20px' }}>
            Select Your Itinerary Type for {selectedCategory}
          </Typography>
          <Button
            variant="contained"
            sx={{ margin: '0 10px', backgroundColor: 'rgba(231, 166, 15, 0.76)' }}
            onClick={() => handleItinerarySelection('ai')}
          >
            AI RECOMMENDED PLACES
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '0 10px', backgroundColor: 'rgba(215, 155, 15, 0.76)' }}
            onClick={() => handleItinerarySelection('manual')}
          >
            CREATE YOUR OWN ITINERARY
          </Button>
          <Button
            variant="contained"
            sx={{ margin: '0 10px', backgroundColor: 'rgba(231, 166, 15, 0.76)' }}
            onClick={handleAIRecommendationClick}
          >
            AI RECOMMENDED ITINERARY
          </Button>
        </Box>
      )}

      {/* Conditionally Render Couple Places */}
      {showCouplePlaces && <CouplePlaceList />}

      {/* Conditionally Render Friends Places */}
      {showFriendsPlaces && <FriendsPlaceList />}

      {/* Conditionally Render AI Recommended Places for Friends */}
      {/* Display AI Recommended Itinerary for Friends */}
{friendsAIRecommendedPlaces && (
  <AIRecommendedPlaces places={friendsAIRecommendedPlaces} /> // Display the AI recommended places
)}

{showAIPlaceList && <AIPlaceList />}



      {/* Footer Section */}
      <Grid container spacing={2} sx={{ marginTop: '40px' }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" sx={{ color: '#ddd', fontStyle: 'italic', textAlign: 'center' }}>
            Explore new places, create unforgettable memories.
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" sx={{ textAlign: 'right', color: '#ddd', fontStyle: 'italic' }}>
            Your journey begins now.
          </Typography>
        </Grid>
      </Grid>
    </AboutContainer>
  );
};

export default AboutSection;
