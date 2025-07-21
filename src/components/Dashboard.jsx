import React from 'react';
import { AppBar,Toolbar,Typography,Box,Card,CardHeader,CardActions,Grid,Button,} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Job_Site from '../assets/job_site.png';

function Dashboard({ user }) {
   const navigate = useNavigate();


     const renderSquareCard = (title, route) => {
  const emojiMap = {
    "Your Jobs": "📂",
    "Your Invoices": "🧾",
    "Your Cards": "💳",
    "Add Job": "➕",
  };

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: 250,
          p: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.03)',
            boxShadow: 6,
          },
        }}
      >
        {/* Title at the top */}
        <CardHeader
          title={title}
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            pt: 1,
          }}
        />

        {/*  emoji below the title */}
        <Box sx={{ fontSize: '2.5rem', textAlign: 'center' }}>
          {emojiMap[title] || ""}
        </Box>

        {/* Button at the bottom */}
        <CardActions sx={{ justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate(`/${route}`)}
          >
            Go to {title}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

  const handleLogout = () => {
    console.log("Logging out...");
    // Add session token  clearing logic here if needed?
   navigate("/login");
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    
    {/* Header */}
      <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: 'center' }}>
      <Typography variant="h6">Job Sight</Typography>
      </Toolbar>
    </AppBar>

      {/* Main Content */}
      <Box sx={{ flex: 1, px: 2, py: 2 }}>
  <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
    Welcome Back, {user?.email || "Freelancer"}!
  </Typography>

  <Box sx={{ textAlign: 'center', mb: 2 }}>
    <img
      src={Job_Site}
      alt="Freelance Tracker Logo"
      style={{ width: 120, height: 120, objectFit: 'contain', boxshadow:'none', filter: 'none' }}
    />
  </Box>
</Box>

        <Grid container spacing={3} justifyContent="center" sx={{ mb: { xs: 4, md: 5 } }}>
          {renderSquareCard("Your Jobs", "jobs")}
          {renderSquareCard("Your Invoices", "invoices")}
          {renderSquareCard("Your Cards", "cards")}
          {renderSquareCard("Add Job", "addjob")}
        </Grid>
        


 <Box sx={{ display: 'flex', justifyContent: 'center', mt: { xs: 4, md: 6 }, mb: { xs: 4, md: 6 } }}>
  <Button
    variant="contained"
    color="primary"
    onClick={handleLogout}
    sx={{
      px: 4,
      py: 1.5,
      fontWeight: 'bold',
      boxShadow: 3,
      '&:hover': {
        backgroundColor: 'primary.dark',
        transform: 'scale(1.05)',
      },
    }}
  >
    Logout
  </Button>
</Box>





{/* Footer */}
<Box
  component="footer"
  sx={{
    backgroundColor: 'primary.main',
    color: 'white',
    textAlign: 'center',
    py: 2,
  }}
>
  <Typography variant="body2" sx={{ mb: 1 }}>
    Follow us with ❤️: 🐦 Twitter | 📸 Instagram
  </Typography>
  <Typography variant="body2">
    &copy; {new Date().getFullYear()} Freelance Tracker. All rights reserved.
  </Typography>
</Box>
</Box>
);
}





export default Dashboard;
