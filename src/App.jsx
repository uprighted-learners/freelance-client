import { useState, useEffect } from 'react'
import Welcome from './components/Welcome'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

function App() {

  return (
    <>
     <Header/>
     <Welcome/>
     <Footer/>
    </>
  )
}

export default App
