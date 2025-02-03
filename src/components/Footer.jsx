import React from 'react';
import { Box, Typography, IconButton, Link } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box 
      sx={{
        backgroundColor: 'rgba(51, 37, 4, 0.76)',
        color: '#fff',
        padding: '20px',
        position: 'relative',
        bottom: 0,
        left: 0,
        width: '100%',
        textAlign: 'center',
        marginTop: '40px',
      }}
    >
      {/* Footer Content */}
      <Typography variant="body1" sx={{ marginBottom: '10px' }}>
        &copy; 2025 Your Company. All rights reserved.
      </Typography>

      {/* Social Media Links */}
      <Box sx={{ marginBottom: '10px' }}>
        <IconButton 
          component={Link} 
          href="https://facebook.com" 
          target="_blank" 
          sx={{ color: '#fff', margin: '0 10px' }}
        >
          <Facebook />
        </IconButton>
        <IconButton 
          component={Link} 
          href="https://twitter.com" 
          target="_blank" 
          sx={{ color: '#fff', margin: '0 10px' }}
        >
          <Twitter />
        </IconButton>
        <IconButton 
          component={Link} 
          href="https://instagram.com" 
          target="_blank" 
          sx={{ color: '#fff', margin: '0 10px' }}
        >
          <Instagram />
        </IconButton>
        <IconButton 
          component={Link} 
          href="https://linkedin.com" 
          target="_blank" 
          sx={{ color: '#fff', margin: '0 10px' }}
        >
          <LinkedIn />
        </IconButton>
      </Box>

      {/* Footer Links */}
      <Box>
        <Link href="#" color="inherit" sx={{ margin: '0 15px' }}>
          Privacy Policy
        </Link>
        <Link href="#" color="inherit" sx={{ margin: '0 15px' }}>
          Terms of Service
        </Link>
        <Link href="#" color="inherit" sx={{ margin: '0 15px' }}>
          Contact Us
        </Link>
      </Box>
    </Box>
  );
};

export default Footer;
