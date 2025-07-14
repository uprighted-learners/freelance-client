import React, { useState, useEffect } from 'react'
import "./jobs.css"
import { ThemeProvider, } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Box from '@mui/system/Box';
import { styled } from '@mui/system';


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
    },)

    const Item = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  ...theme.applyStyles('dark', {
    backgroundColor: '#262B32',
  }),
}));

    

    const showJobs = () => {
        return data.map(d => 
            <div className='card'>
                Name: {d.name} Job Title: {d.job} Salary: {d.salary}
                
            </div>
        )
    }
  return (
    <div>
        <div>
            <h1>JobSight</h1>
            <h2>Available Jobs</h2>
        </div>
        
        {showJobs()}
        
    </div>

  )
};