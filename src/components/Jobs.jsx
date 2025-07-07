import React, { useState, useEffect } from 'react'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

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

    const theme = createTheme({
    components: {
        MuiStack: {
        defaultProps: {
            useFlexGap: true,
        },
        },
    },
    });

    const showJobs = () => {
        return data.map(d => <p>Job: {d.name} </p> )
    }
  return (
    <div> 
        {showJobs()} 
        <ThemeProvider theme={theme}>
        <Stack>{showJobs()}</Stack> {/* uses flexbox gap by default */}
        </ThemeProvider>
    </div>

  )
}