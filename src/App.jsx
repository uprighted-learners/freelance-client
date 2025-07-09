import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import Welcome from './components/Welcome'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

import Jobs from './components/Jobs'

function App() {

  const [ sessionToken, setSessionToken ] = useState(undefined)

  useEffect(() => {
    if (localStorage.getItem("token")){
      setSessionToken(localStorage.getItem("token"))
    }
  })

  const updateLocalStorage = newToken => {
    localStorage.setItem("token", newToken)
    sessionToken(newToken)
  }

  return (
    <>
    <BrowserRouter>
      <Header />
     {/* <Welcome /> */}
      <Routes>
        <Route path='/jobs' element={ <Jobs /> } />
      </Routes>
      <Footer />
    
    
    </BrowserRouter>
     
    </>
  )
}

export default App
