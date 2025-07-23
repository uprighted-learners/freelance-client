import React, { useState } from 'react'
import "./auth.css"
import { useNavigate } from 'react-router-dom'
import { Box, TextField, Button, Typography, Toolbar, AppBar } from '@mui/material'

const formWrapperSx = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    mt: '300px',
    gap: 2,
    maxWidth: 400,
    mx: 'auto',
};

const textFieldSx = {
    height: '58px',
    backgroundColor: '#cecece',
    borderRadius: '5px',
    border: '1px solid #000000ff',
    '& input': {
    color: 'black',
    fontSize: 'large',
    textAlign: 'center',
    },
};

const buttonSx = {
    backgroundColor: 'primary.dark',
    color: 'black',
    fontSize: '20px',
    borderRadius: '5px',
    border: '1px solid #000000ff',
    padding: '10px 20px',
    '&:hover': {
    backgroundColor: '#7499cfff',
    },
};

export default function Auth({ updateLocalStorage }) {
    const navigate = useNavigate()

    const [login, setLogin] = useState(true)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const toggle = () => {
    setLogin(!login)
    setError('')
    }

    const toggleBtn = () => login ? "Register" : "Login"

    const handleSubmit = (e) => {
    e.preventDefault()

    const url = login
        ? "http://127.0.0.1:4000/auth/login"
        : "http://127.0.0.1:4000/auth/register"

    const body = login
        ? { email, password }
        : { fullName, email, password }

    fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
        "Content-Type": "application/json"
        }
    })
        .then(async (res) => {
        const contentType = res.headers.get('content-type')

        if (!res.ok) {
            const text = await res.text()
            throw new Error(text || 'Request failed')
        }

        if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Expected JSON but received something else')
        }

        const data = await res.json()

        if (login && data.token) {
            updateLocalStorage(data.token)
            navigate('/Dashboard')
        } else if (!login) {
            setError(data.message || 'Registration failed')
        } else {
            setError('Login failed')
        }
        })
        .catch((err) => {
        console.error('Fetch error:', err)
        setError('Something went wrong. Please try again.')
        })
    }

    return (
    <Box sx={{ bgcolor: '#949393', minHeight: '100vh', p: 2 }}>

    <AppBar position="static" color="primary">
        <Toolbar sx={{ justifyContent: 'center' }}>
        <Typography variant="h6">Job Sight</Typography>
        </Toolbar>
    </AppBar>


        <Box component="form" onSubmit={handleSubmit} sx={formWrapperSx}>
        {!login && (
            <TextField
            label="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            variant='outlined'
            sx={textFieldSx}
            />
        )}
        <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant='outlined'
            sx={textFieldSx}
        />
        <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant='outlined'
            sx={textFieldSx}
        />
        {error && (
            <Typography color="error" variant="body2">
            {error}
            </Typography>
        )}
        <Button type="submit" sx={buttonSx}>Go</Button>
        <Button type="button" onClick={toggle} sx={buttonSx}>{toggleBtn()}</Button>

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
    </Box>
    )
}