import { useState, useEffect } from 'react'
import './App.css'
import Auth from './components/Auth'


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
		: <Rooms sessionToken={sessionToken} />
	
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
