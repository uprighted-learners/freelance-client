import React, { useEffect, useState } from 'react';
import { AppBar,Toolbar,Typography,Box,Card,CardHeader,CardActions,Grid,Button,} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard({ user, sessionToken }) {
  const [jobs, setJobs] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [cards, setCards] = useState([]);
  const [addjob, setaddjob] = useState([]);
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://127.0.0.1:4000/jobs/alljobs", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken,
        },
      });
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.log("Error fetching jobs:", err);
    }
  };

   const fetchInvoices = async () => {
    try {
      const res = await fetch("http://127.0.0.1:4000/invoices", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken,
        },
      });
      const data = await res.json();
      setInvoices(data);
    } catch (err) {
      console.log("Error fetching invoices:", err);
    }
  };

    const fetchCards = async () => {
    try {
      const res = await fetch("http://127.0.0.1:4000/cards/allcards", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken,
        },
      });
      const json = await res.json();
      setCards(json.data);
    } catch (err) {
      console.log("Error fetching cards:", err);
    }
  };

    const fetchAddJob = async () => {
    try {
      const res = await fetch("http://127.0.0.1:4000/jobs/addjob", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authorization": sessionToken,
        },
      });
      const data = await res.json();
      setaddjob(data);
    } catch (err) {
      console.log("Error fetching add job data:", err);
    }
  };

useEffect(() => {
    fetchJobs();
    fetchInvoices();
    fetchCards();
    fetchAddJob();
  }, [sessionToken]);

     const renderSquareCard = (title, route) => (
    <Grid item xs={12} sm={6} md={4}>
      <Card
        sx={{
          height: 250,
          p: 2,
          boxShadow: 3,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <CardHeader title={title} />
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
      <Box sx={{ flex: 1, px: 2, py: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
          Welcome Back, {user?.email || "Freelancer"}!
        </Typography>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <img
            src="/assets/job-site.png"
            alt="Logo"
            style={{ width: 50, height: 50, objectFit: 'contain' }}
          />
        </Box>

        <Grid container spacing={3} justifyContent="center">
          {renderSquareCard("Your Jobs", "jobs")}
          {renderSquareCard("Your Invoices", "invoices")}
          {renderSquareCard("Your Cards", "cards")}
          {renderSquareCard("Add Job", "addjob")}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{ px: 4, py: 1.5 }}
          >
            Logout
          </Button>
        </Box>
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
       
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Freelance Tracker. All rights reserved.
        </Typography>
      </Box>
      </Box>
    );
    }

export default Dashboard;

