import React from 'react'
import "./header.css"

function Header() {
  return (
    <header>
      <nav>
        <h1>Freelance Tracker</h1>
        <ul className="nav-links">
        <li><a href="http://127.0.0.1:4000/register">Register</a></li>
        </ul>

      </nav>
    </header>
  );
}

  
export default Header


