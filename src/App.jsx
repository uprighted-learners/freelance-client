import { useState, useEffect } from 'react'
import Welcome from './components/Welcome'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import Auth from './components/Auth'
import { Routes } from 'react-router-dom'



function App() {
  
	const [sessionToken, setSessionToken ] = useState(undefined)


	useEffect(() => {
    if (localStorage.getItem("token")) {
    setSessionToken(localStorage.getItem("token"))
    }
  },[])

  const updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken)
    setSessionToken(newToken)
  }



	const renderView = () => {
		return !sessionToken
		? <Auth updateLocalStorage={updateLocalStorage} />
		: <Jobs sessionToken={sessionToken} />
	
	}



	const logout = () => {
		if (localStorage.getItem("token")) {
			localStorage.removeItem("token")
			setSessionToken(undefined)
		}
		
	}
	
	return (
		<>
			<button onClick={logout}>Logout</button>
			{renderView()}
		</>
	)
	
}

export default App
