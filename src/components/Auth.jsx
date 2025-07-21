import React, { useState } from 'react'
import "./auth.css"





export default function Auth({ updateLocalStorage}) {



    const [login, setLogin] = useState(true)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const register = () => login ? null : (
        <input type="text" id='name' value={fullName} placeholder='Enter full name' onChange={e =>
            setFullName(e.target.value)}></input>)

    const toggle = () => {
        setLogin(!login)
    }

    const toggleBtn = () => login ? "Register" : "Login"

    const handleSubmit = (e) => {
        e.preventDefault()

        const url = login 
            ? "http://127.0.0.1:4000/login"
			: "http://127.0.0.1:4000/register"

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
        .then(res => {
            return res.json()
        })
        .then(data => {
            console.log(data)
            updateLocalStorage(data.token)
           
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        <form action="" className="form-wrapper">
				{register()}
				<input type="email" value={email} name="email" id="email" placeholder='Enter email' onChange={e => setEmail(e.target.value)}/>
				<input type="password" value={password} name="pwd" id="pwd" placeholder='Enter password' onChange={e => setPassword(e.target.value)} />
				<button class="go-btn"onClick={handleSubmit}>Go</button>
				<button onClick={toggle} type='button' className='logRegisterBtn'>{toggleBtn()}</button>
			</form>
        </>
    )
}