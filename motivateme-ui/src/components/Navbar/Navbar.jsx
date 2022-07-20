import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router-dom'
import apiClient from '../../../services/apiclient'

export default function Navbar( { user, setUser, currPage } ) {
  // Function needed in order to conditionally render different navbars
  // to different specific pages (ie 1. landing, 2. login/register 3.else)
  const showSpecificParts = (user, currPage) => {
    if (currPage === "landing") {
      return <div className='navbar'>
                <div className="content">
                      <div className="logo">
                        <h2 className='logo-title'>MotivateMe</h2>
                        <Link to="/">
                          <img id="home-logo" src="https://cdn-icons-png.flaticon.com/512/2163/2163301.png" alt="Home Logo" />
                        </Link>
                      </div>
                      <div className='account-links'>

                        {
                          user !== null && user !== undefined ? 
                            <>
                            {console.log(user)}
                              <img id="pfp" src={user.image} alt="PFP" />
                              <Link to="/">
                                <button className="nav-btn" onClick={() => { apiClient.logout();
                                                                              setUser(null); }}>Log Out</button>
                              </Link>
                            </>
                          :
                          <>
                            <Link to="/login">
                              <button className="nav-btn">Log In</button>
                            </Link>
                            <Link to="/register">
                              <button className="nav-btn">Register</button>
                            </Link>
                          </>
                          }
                        </div>
                </div>
              </div>
    }
    else if (currPage === "login" || currPage === "register") {
      return <div className='navbar'>
              <div className="content">
                    <div className="logo">
                      <h2 className='logo-title'>MotivateMe</h2>
                      <Link to="/">
                        <img id="home-logo" src="https://cdn-icons-png.flaticon.com/512/2163/2163301.png" alt="Home Logo" />
                      </Link>
                    </div>
              </div>
            </div>
    }
    else {
      return <div className='navbar'>
                <div className="content">
                      <div className="logo">
                        <h2 className='logo-title'>MotivateMe</h2>
                        <Link to="/">
                          <img id="home-logo" src="https://cdn-icons-png.flaticon.com/512/2163/2163301.png" alt="Home Logo" />
                        </Link>
                      </div>
                      <div className="nav-links">
                        <Link to="/recap">
                          <button className={`nav-btn ${currPage==="recap" ? "active" : ""}`}>Recap</button>
                        </Link>
                        <Link to="/dashboard">
                          <button className={`nav-btn ${currPage==="dashboard" ? "active" : ""}`}>Dashboard</button>
                        </Link>
                        <Link to="/todo">
                          <button className={`nav-btn ${currPage==="todo" ? "active" : ""}`}>To-Do</button>
                        </Link>
                      </div>
                      <div className='account-links'>

                        {
                          user !== null && user !== undefined ? 
                            <>
                              <img id="pfp" src={user.image} alt="PFP" />
                              <Link to="/">
                                <button className="nav-btn" onClick={() => { apiClient.logout();
                                                                              setUser(null); }}>Log Out</button>
                              </Link>
                            </>
                          :
                          <>
                            <Link to="/login">
                              <button className="nav-btn">Log In</button>
                            </Link>
                            <Link to="/register">
                              <button className="nav-btn">Register</button>
                            </Link>
                          </>
                          }
                        </div>
                </div>
              </div>
    }
  }

  return (
     <>
     {showSpecificParts(user, currPage)}
     </>
    
  )
}
