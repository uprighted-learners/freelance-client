import { useState, useEffect } from 'react'

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
      <Jobs sessionToken={sessionToken} />
     <h1>Welcome to your front end</h1>
     <Header/>
     <Welcome/>
     <Footer/>
    </>
  )
}

export default App
