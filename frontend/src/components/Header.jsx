import React from 'react';
import { Link } from "react-router-dom"

function Header() {
  return (
    <div className='bg-secondary border-bottom border-primary headerDiv'>
      <div className='d-flex justify-content-between align-items-center px-3'>
        <h1 className='fw-bold'>Auth App</h1>
        <ul className='d-flex gap-4 headerUl'>
        <Link to="/"><li>Home</li></Link>
        <Link to="/about"><li>About</li></Link>
        <Link to="/signUp"><li>Sign-Up</li></Link>
        </ul>
      </div>
    </div>
  )
}

export default Header