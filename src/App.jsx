import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import Welcome from './components/Welcome'
import './App.css'
import Auth from './components/Auth'


import Jobs from './components/Jobs'
import Cards from './components/Cards'

function App() {
  
  


	const [sessionToken, setSessionToken ] = useState(undefined)

  

  useEffect(() => {
    if (localStorage.getItem("token")){
      setSessionToken(localStorage.getItem("token"))
    }
  })

  const updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken)
    sessionToken(newToken)
  }
  const renderView = () => {
		return !sessionToken
		? <Auth updateLocalStorage={updateLocalStorage} />
		: <Welcome sessionToken={sessionToken} />
	
	}
  const logout = () => {
		if (localStorage.getItem("token")) {
			localStorage.removeItem("token")
			setSessionToken(undefined)
		}
	}

    


	// return
		<>
			<button onClick={logout}>Logout</button>
			{renderView()}
		</>
  return (
    <>
    <BrowserRouter>
      <Header />
     {/* <Welcome />*/}
      <Routes>
        <Route path='/jobs' element={ <Jobs /> } />
        <Route path='/cards' element={ <Cards /> } />
      </Routes>
      <button onClick={logout()}>Logout</button>
			{renderView()}
      <Footer />
    
    
    </BrowserRouter>
     
    </>
  )
	
  
    
}





export default App
