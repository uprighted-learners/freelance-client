import React, { useState, useEffect } from 'react'
import "./jobs.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';



export default function Jobs({ sessionToken }) {

    const [ data, setData ] = useState([])
    console.log(data)

    const fetchData = () => {
        const url = "http://127.0.0.1:4000/jobs/alljobs"
        fetch(url, {
            method: "GET",
            headers: new Headers({
               "Content-Type": "application/json",
                "authorization": sessionToken
            })
        })
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchData()
        console.log(data)
        console.log(data)
    }, [])


    const showJobs = () => {
        return data.map(d => 
            <div>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant='h5' component="div" >
                            {d.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} >
                            {d.job}
                            
                        </Typography>
                        <Typography>
                            {d.description}
                        </Typography>
                        <Typography>Salary: {d.salary} </Typography>

                    </CardContent>
                </Card>
                <Divider />
                
            </div>
        )
    }
  return (
    <div>
        <div>
            <h1>Available Jobs</h1>
        </div>
        <div>
            {showJobs()}
        </div>
       
        
        
    </div>

  )
};