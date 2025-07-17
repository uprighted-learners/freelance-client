import React, { useEffect, useState } from 'react';
import { AppBar,Toolbar, Typography,Box,Card, Grid} from '@mui/material';



function Dashboard({ user, sessionToken }) {
  const [jobs, setJobs] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [cards, setCards] = useState([]);

useEffect(() => {
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
        const res = await fetch("http://127.0.0.1:4000/invoices");
        const data = await res.json();
        setInvoices(data);
      } catch (err) {
        console.log("Error fetching invoices:", err);
      }
    };

    const fetchCards = async () => {
      try {
        const res = await fetch("http://127.0.0.1:4000/cards/allcards");
        const json = await res.json();
        setCards(json.data);
      } catch (err) {
        console.log("Error fetching cards:", err);
      }
    };

    fetchJobs();
    fetchInvoices();
     fetchCards();
  }, [sessionToken]);



  {/* sqaure card for jobs etc */}
  const renderSquareCard = (title, items, type) => (
  <Grid item xs={12} sm={6} md={4}>
  
  <Card sx={{ height: 250, p: 2, boxShadow: 3 }}>
    
    <Typography variant="h6" gutterBottom>{title}</Typography>
    <ul style={{ paddingLeft: 0, listStyleType: 'none', margin: 0 }}>
       
  {items.map((item) => {
  if (type === "jobs") {
    return (
      <li key={item._id}>
        {item.name} , {item.job} , ${item.salary} , {item.jobStatus}
      </li>
    ); }
          if (type ==="invoice") {
            return (
            <li key={item._id}>
            Invoice {item.status} , {item.amount}, {item.date}
             </li>
            );
          }
          if (type === "card") {
            return (
            <li key={item._id}>
             {item.name}: {item.monthlyIncome} ,{item.summary}
             </li>
            );
          }
          return null;
        })}
      </ul>
  </Card>
  </Grid>
);

     return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
     
      {/* Header */}
      <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'center' }}>
       <Typography variant="h6" align="center">
            Job Sight
       </Typography>
        </Toolbar>
        </AppBar>

   {/* Main Content */}
  
  <Box sx={{ flex: 1, px: 2, py: 3 }}>
  <Typography variant="h5" gutterBottom sx={{ textAlign: 'center' }}>
    Welcome Back, {user?.email || "Freelancer"}!
  </Typography>


 {/* Logo */}
<Box sx={{ textAlign: 'center', mb: 3 }}>
  <img
    src="/assets/job-site.png"
    alt="Freelance Tracker Logo"
    style={{
      width: 50,
      height: 50,
      objectFit: 'contain',
    }}
  />
</Box>
<Grid container spacing={3} justifyContent="center">
      {renderSquareCard("Your Jobs", jobs)}
      {renderSquareCard("Your Invoices", invoices)}
      {renderSquareCard("Your Cards", cards)}
 </Grid>

   {/* Logout Button */}
  <Box sx={{ textAlign: 'center', mt: 4 }}>
    <button onClick={() => console.log("Logging out...")} style={{
      padding: '10px 20px',
      backgroundColor: '#1976d2',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    }}>
      Logout
    </button>
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
        <Typography variant="body2">  &copy; {new Date().getFullYear()} Freelance Tracker. All rights reserved.</Typography>
      </Box> 
     </Box>
  );
}

export default Dashboard;