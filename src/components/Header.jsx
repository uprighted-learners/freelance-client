import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import "./header.css"
import Jobs from './Jobs';

function Header() {
  return (
    <header>
      <nav>
        <h1>Freelance Tracker</h1>
        <ul className="nav-links">
        <li><a href="#register">Register</a></li>
        <li>
          <NavLink to="/jobs">Jobs</NavLink>
        </li>
        </ul>

      </nav>
    </header>
  );
}

  
export default Header


