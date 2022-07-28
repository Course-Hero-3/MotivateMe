import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import apiClient from "../../../services/apiclient";
import { GoogleLogout } from "react-google-login";

const clientId =
  "505543512767-7eaflkfnc9l791ojove3bgb2hvuh61a3.apps.googleusercontent.com";

export default function Navbar({
  user,
  setUser,
  currPage,
  loggedInWithGoogle,
  setLoggedInWithGoogle,
}) {
  const onLogoutSuccess = () => {
    setLoggedInWithGoogle(false);
    apiClient.logout();
    setUser(null);
  };
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
                <Link to="/todo">
                  <button
                    className={`nav-btn ${currPage === "todo" ? "active" : ""}`}
                  >
                    To-Do
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
                <Link to="/social">
                  <button
                    className={`nav-btn ${
                      currPage === "social" ? "active" : ""
                    }`}
                  >
                    Social
                  </button>
                </Link>
              </div>
              <div className="account-links">
                <img
                  id="pfp"
                  src={user.image}
                  alt="PFP"
                  onError={(event) => {
                    event.target.src =
                      "https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png";
                    event.onerror = null;
                  }}
                />
                {loggedInWithGoogle ? (
                  <Link to="/">
                    <GoogleLogout
                      clientId={clientId}
                      buttontext="Log Out"
                      onLogoutSuccess={onLogoutSuccess}
                    ></GoogleLogout>
                  </Link>
                ) : (
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
                  </>
                )}
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
