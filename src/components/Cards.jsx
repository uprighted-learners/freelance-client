import React, { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
export default function Cards({ sessionToken }) {
    const [ data, setData ] = useState([])

    const fetchData = () => {
        const url = "http://127.0.0.1:4000/cards/allcards"
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
    }, [])

    const showCards = () => {
        return data.map(d => 
            <div>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant='h5' component="div">
                            {d.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            Salary: {d.monthlyIncome}
                        </Typography>
                        <Typography>
                            {d.summary}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        
        )
    }

  return (
    <>
        <div>
            <h1>Summary Cards</h1>
            
        </div>
        <div>
            {showCards()}
        </div>
        
    </>
  )
}
