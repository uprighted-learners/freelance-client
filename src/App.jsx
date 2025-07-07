import { useState, useEffect } from 'react'

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
    </>
  )
}

export default App
