import React from 'react'

function Header() {
  return (
    <div >
      <div className='d-flex justify-content-around'>
        <h1>Auth App</h1>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Sign-Up</li>
        </ul>
      </div>
    </div>
  )
}

export default Header