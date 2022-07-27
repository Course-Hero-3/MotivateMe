import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import apiClient from "../../../services/apiclient";
import { GoogleLogout } from "react-google-login";


export default function Navbar({ user, setUser, currPage, loggedInWithGoogle, setLoggedInWithGoogle }) {
  // Function needed in order to conditionally render different navbars
  // to different specific pages (ie 1. landing, 2. login/register 3.else)
  return (
    <>
      {user !== null && user !== undefined ? (
        <>
          <div className="navbar">
            <div className="content">
              <div className="logo">
                <h2 className="logo-title">MotivateMe</h2>
                <Link to="/">
                  <img
                    id="home-logo"
                    src="https://cdn-icons-png.flaticon.com/512/2163/2163301.png"
                    alt="Home Logo"
                  />
                </Link>
              </div>
              <div className="nav-links">
                <Link to="/dashboard">
                  <button
                    className={`nav-btn ${
                      currPage === "dashboard" ? "active" : ""
                    }`}
                  >
                    Dashboard
                  </button>
                </Link>
                <Link to="/recap">
                  <button
                    className={`nav-btn ${
                      currPage === "recap" ? "active" : ""
                    }`}
                  >
                    Recap
                  </button>
                </Link>
                <Link to="/todo">
                  <button
                    className={`nav-btn ${currPage === "todo" ? "active" : ""}`}
                  >
                    To-Do
                  </button>
                </Link>
                <Link to="/social">
                  <button
                    className={`nav-btn ${
                      currPage === "social" ? "active" : ""
                    }`}
                  >
                    Social Feed
                  </button>
                </Link>
              </div>
              <div className="account-links">
                <img id="pfp" src={user.image} alt="PFP" />
                {loggedInWithGoogle ? 
                <>
                {/* GOOGLE LOG OUT BUTTON */}
                </>
                :
                <>
                <Link to="/">
                  <button
                    className="nav-btn"
                    onClick={() => {
                      apiClient.logout();
                      setUser(null);
                    }}
                  >
                    Log Out
                  </button>
                </Link>
                </>}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {currPage === "landing" ? (
            <>
              <div className="navbar">
                <div className="content">
                  <div className="logo">
                    <h2 className="logo-title">MotivateMe</h2>
                    <Link to="/">
                      <img
                        id="home-logo"
                        src="https://cdn-icons-png.flaticon.com/512/2163/2163301.png"
                        alt="Home Logo"
                      />
                    </Link>
                  </div>
                  <div className="account-links">
                    <>
                      <Link to="/login">
                        <button className="nav-btn">Log In</button>
                      </Link>
                      <Link to="/register">
                        <button className="nav-btn">Register</button>
                      </Link>
                    </>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="navbar">
                <div className="content">
                  <div className="logo">
                    <h2 className="logo-title">MotivateMe</h2>
                    <Link to="/">
                      <img
                        id="home-logo"
                        src="https://cdn-icons-png.flaticon.com/512/2163/2163301.png"
                        alt="Home Logo"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
