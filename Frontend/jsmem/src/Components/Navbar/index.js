import React from 'react'
import { FaSearch } from "react-icons/fa";
import "./index.css"

const Navbar = () => {
  return (
<div className='top-nav'>
  <div className='logo-container'>
    <img src = "https://res.cloudinary.com/dylh46szw/image/upload/v1711793425/favicon2_pef2lb.jpg" alt = "jan-logos" className='jan-logo'/>
    </div>
    <div className='input-container'>
      <FaSearch className='search-icon'/>
      <input type="text" placeholder="Search" className='input-search-box'/>
    </div>
  </div>
  )
}

export default Navbar