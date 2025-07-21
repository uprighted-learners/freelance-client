
 import React from 'react'
import { AppBar,Toolbar, Box, Typography, List, ListItem,ListItemText,Button,Container,Divider,} from '@mui/material';
import { useNavigate } from 'react-router-dom';
  




function WelcomeBanner() {

  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/Auth')
  }

  return (
    <>
      {/* Header */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'center' }}>
          <Typography variant="h6" align="center">
            Welcome to Job Sight
          </Typography>
        </Toolbar>
      </AppBar>

 {/* Logo */}
<Box sx={{ textAlign: 'center', mb: 3 }}>
  <img
    src="/assets/Job Site.png"
    alt="Freelance Tracker Logo"
    style={{
      width: 100,
      height: 100,
      objectFit: 'contain',
    }}
  />
</Box>

      {/* Main  body Content */}
      <Container maxWidth="md" sx={{ my: 4 }}>
        <Box
          sx={{
            padding: 4,
            background: 'linear-gradient(145deg, #e3f2fd, #ffffff)',
            borderRadius: 2,
            textAlign: 'center',
            boxShadow: 3,
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#1976d2',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            }}
          >
            Freelance Tracker
          </Typography>

          <Typography component="p" sx={{ mb: 2 }}>
        Take control of your freelance career by managing your work all in one place.
        The Freelance Tracker allows you to organize job applications, projects, and invoices at your own pace.
            </Typography>

          <Typography variant="h6" sx={{ color: '#1976d2', marginY: 2 }}>
            🌟 Start maximizing your productivity today!
          </Typography>

          <Divider sx={{ marginY: 2 }} />

          <Typography variant="h5" gutterBottom>
            What can you do?
          </Typography>

          <List>
            <ListItem><ListItemText primary="✅ Track job applications" /></ListItem>
            <ListItem><ListItemText primary="📁 Manage freelance projects" /></ListItem>
            <ListItem><ListItemText primary="💸 Generate and monitor invoices" /></ListItem>
            <ListItem><ListItemText primary="🧑‍💻 Access a personalized workspace and dashboard upon login" /></ListItem>
          </List>

          <Typography variant="body2" sx={{ marginTop: 2 }}>
            Use these simple tools to help you stay organized. To get started, simply register or log in.
          </Typography>

 <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Button onClick={ handleClick }
        
        variant="contained"
        color="primary"
        sx={{
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: '#1565c0',
          },
        }}
      >
        Register or Login
      </Button>
    </Box>
   </Box> 
 </Container> 



      {/* Footer */}
      <Box
        component="footer"
        sx={{
          backgroundColor: 'primary.main',
          color: 'white',
          textAlign: 'center',
          py: 2,
          mt: 4,
        }}
      >
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Freelance Tracker. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}

export default WelcomeBanner;



