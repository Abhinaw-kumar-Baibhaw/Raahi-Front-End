import React, { useState, useEffect } from 'react';
import Chatbot from './components/Chatbot.jsx';
import CouplePlaceList from './components/CouplePlaceList';
import AboutSection from './components/AboutSection';  // Import the AboutSection component
import { AppBar, Toolbar, Typography, Box, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Avatar, Card, CardContent } from '@mui/material';
import { styled } from '@mui/system';
import PersonIcon from '@mui/icons-material/Person';
import { Slide } from '@mui/material';
import Footer from './components/Footer'; // Import Footer component

// Styled Header Component
const Header = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'dark' })`
  background: ${({ dark }) => (dark ? '#333' : 'linear-gradient(135deg, rgba(255, 255, 255, 0.49), rgba(250, 234, 152, 0.16))')};
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  position: sticky;
  top: 0;
  z-index: 1000;

  ${({ hide }) => hide && `transform: translateY(-100%);`}

  &:hover {
    transform: scale(1.0);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  }
`;

const HeaderText = styled(Typography)`
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  text-align: left;
  color: #fdb913;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.86);
`;

// Custom Transition for Dialog Animation
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// Styled Dialog with Transparent Background
const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    background-color: rgba(255, 255, 255, 0.8); /* Transparent background */
    backdrop-filter: blur(10px); /* Apply blur effect */
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }
`;

const StyledButton = styled(Button)`
  background-color: #fdb913;
  color: #000;
  font-weight: bold;
  padding: 12px 30px;
  border-radius: 8px;
  transition: all 0.3s ease;
  &:hover {
    background-color: #e08a13; /* Slightly darker on hover */
  }
`;

function App() {
  const [scrollingDown, setScrollingDown] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [hideHeader, setHideHeader] = useState(false);
  let lastScrollY = 0;

  useEffect(() => {
    // Detect scroll direction
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setScrollingDown(true);
        setHideHeader(true);
      } else {
        setScrollingDown(false);
        setHideHeader(false);
      }
      lastScrollY = window.scrollY <= 0 ? 0 : window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Set the background image
    document.body.style.backgroundImage = 'url(/images/header1.jpg)';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
    document.body.style.backgroundColor = "#f4f4f4";

    // Disable horizontal scrolling
    document.body.style.overflowX = 'hidden';

    // Cleanup on unmount
    return () => {
      document.body.style.overflowX = 'auto'; // Reset overflowX
    };
  }, []);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div>
      {/* Header */}
      <Header position="sticky" dark={scrollingDown} hide={hideHeader}>
        <Toolbar>
          <HeaderText variant="h4">RAAHI</HeaderText>
          <IconButton edge="end" color="inherit" onClick={handleDialogOpen} sx={{ marginLeft: 'auto' }}>
            <Avatar>
              <PersonIcon />
            </Avatar>
          </IconButton>
        </Toolbar>
      </Header>
  
      {/* About Section */}
      <AboutSection />
  
      {/* Cards Section */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px', flexWrap: 'wrap' }}>
        {/* Card 1: Discover New Places */}
        <Card sx={{ width: '45%', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px',backgroundColor:'rgba(253, 187, 19, 0.21)' }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: '15px', color: 'white'}}>
              Discover New Places
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ marginBottom: '10px',color:'white' }}>
              Our app helps you discover amazing couple places tailored to your preferences. Whether you're seeking a peaceful getaway or an adventurous trip, we have you covered.
            </Typography>
            <Typography variant="body2" color="white" sx={{ marginBottom: '10px' }}>
              Explore destinations across various categories like Romantic, Adventure, Nature, and more! We hand-pick the best locations that fit your desires, providing you with unforgettable experiences.
            </Typography>
            <Typography variant="body2" color="white">
              With filters and search functionality, finding the perfect couple-friendly places has never been easier. Your next adventure starts here!
            </Typography>
          </CardContent>
        </Card>

        {/* Card 2: Plan Your Perfect Trip */}
        <Card sx={{ width: '45%', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' ,backgroundColor:'rgba(253, 187, 19, 0.21)' }}>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', marginBottom: '15px' , color:'white' }}>
              Plan Your Perfect Trip
            </Typography>
            <Typography variant="body1" color="white" sx={{ marginBottom: '10px' }}>
              Creating your ideal itinerary has never been easier! Simply select your favorite destinations and categories, and we’ll build a personalized trip just for you.
            </Typography>
            <Typography variant="body2" color="white" sx={{ marginBottom: '10px' }}>
              From day trips to extended vacations, our app helps you manage your entire itinerary in one place. Choose destinations, plan activities, and share your itinerary with your loved ones.
            </Typography>
            <Typography variant="body2" color="white">
              The app also lets you save places, add notes, and receive recommendations based on your preferences. Start planning today and make your dream trip a reality!
            </Typography>
          </CardContent>
        </Card>
      </Box>
  
      {/* Chatbot Component */}
      <Chatbot />
  
      {/* Dialog Box */}
      <StyledDialog open={openDialog} onClose={handleDialogClose} fullWidth maxWidth="sm" TransitionComponent={Transition}>
        <DialogTitle sx={{ textAlign: 'center', color: 'black' }}>
          {isLogin ? 'Login' : 'Sign Up'}
        </DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Email" type="email" fullWidth variant="outlined" sx={{ marginBottom: '15px' }} />
          <TextField margin="dense" label="Password" type="password" fullWidth variant="outlined" sx={{ marginBottom: '15px' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary" sx={{ fontWeight: 'bold' }}>Cancel</Button>
          <StyledButton onClick={handleDialogClose}>{isLogin ? 'Login' : 'Sign Up'}</StyledButton>
        </DialogActions>
      </StyledDialog>
  
      {/* Footer */}
      <Footer />
    </div>
  );
  
}

export default App;
