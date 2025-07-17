import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import Welcome from './components/Welcome'
import './App.css'
import Auth from './components/Auth'
import Jobs from './components/Jobs'
import Cards from './components/Cards'
import AddJob from './components/AddJob'


function App() {
  
  


	const [sessionToken, setSessionToken ] = useState(undefined)

  


  useEffect(() => {
    if (localStorage.getItem("token")){
      setSessionToken(localStorage.getItem("token"))
    }
},[])

  const updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken)
    sessionToken(newToken)
  }
  const logout = () => {
		if (localStorage.getItem("token")) {
			localStorage.removeItem("token")
			setSessionToken(undefined)
		}
		
	}
	

    


	
  return (
    <>
    <BrowserRouter>
     
      <Routes>
        <Route path='/Welcome' element={<Welcome />} />
        <Route path='/Jobs' element={ <Jobs /> } />
        <Route path='/cards' element={ <Cards /> } />
        <Route path='/jobs/addjob' element={ <AddJob /> } />
		<Route path='/Auth' element={ <Auth updateLocalStorage={updateLocalStorage}/> } />
      </Routes>
      <button onClick={logout}>Logout</button>
		
    </BrowserRouter>
     
    </>
  )
	
  
    
}





export default App
