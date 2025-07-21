import React, { useState } from 'react'
import "./auth.css"
import { useNavigate } from 'react-router-dom'




export default function Auth({ updateLocalStorage}) {

    const navigate = useNavigate()

    const [login, setLogin] = useState(true)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const register = () => login ? null : (
        <input type="text" id='name' value={fullName} placeholder='Enter full name' onChange={e =>
            setFullName(e.target.value)}></input>)

    const toggle = () => {
        setLogin(!login)
        setError(' ')
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
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(async (res) => {
        const contentType = res.headers.get('content-type');

        if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Request failed');
        }

        if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Expected JSON but received something else');
        }

        const data = await res.json();

        if (login && data.token) {
        updateLocalStorage(data.token);
        navigate('/Dashboard');
        } else if (!login) {
        setError(data.message || 'Registration failed');
        } else {
        setError('Login failed');
        }
    })
    .catch((err) => {
      console.error('Fetch error:', err);
      setError('Something went wrong. Please try again.');
    });
    }

    return (
        <>
        <form action="" className="form-wrapper">
				{register()}
				<input type="email" value={email} name="email" id="email" placeholder='Enter email' onChange={e => setEmail(e.target.value)}/>
				<input type="password" value={password} name="pwd" id="pwd" placeholder='Enter password' onChange={e => setPassword(e.target.value)} />
                {error && <p class="error">{error}</p>}
				<button class="go-btn"onClick={handleSubmit}>Go</button>
				<button onClick={toggle} type='button' className='logRegisterBtn'>{toggleBtn()}</button>
			</form>
        </>
    )
}