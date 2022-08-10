import React, { useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import apiClient from "../../../services/apiclient";
import { GoogleLogout } from "react-google-login";
/*for popover */
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Tooltip
} from "@chakra-ui/react";

import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const clientId =
  "505543512767-7eaflkfnc9l791ojove3bgb2hvuh61a3.apps.googleusercontent.com";

export default function Navbar({
  user,
  setUser,
  currPage,
  loggedInWithGoogle,
  setLoggedInWithGoogle,
  colorMode
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
          <div className="navbar d-flex flex-row justify-content-center">
            <div className="content d-flex flex-row justify-content-between">
              <div className="logo">
                <h2 className="logo-title">MotivateMe</h2>
                <Tooltip hasArrow label='Home'  
                bg={`${colorMode === "light" ? '#34B3F1' : "#2e2d2d"}`} color='#fff'>
                <Link to="/">
                  <img
                    id="home-logo"
                    src="https://cdn-icons-png.flaticon.com/512/2163/2163301.png"
                    alt="Home Logo"
                  />
                </Link>
                </Tooltip>
              </div>
              <div className="nav-links">
                <Link to="/dashboard">
                  <button
                    className={`nav-btn ${
                      currPage === "dashboard" ? "active-tab" : ""
                    }`}
                  >
                    Dashboard
                  </button>
                </Link>
                <Link to="/todo">
                  <button
                    className={`nav-btn ${
                      currPage === "todo" ? "active-tab" : ""
                    }`}
                  >
                    Todo
                  </button>
                </Link>
                <Link to="/recap">
                  <button
                    className={`nav-btn ${
                      currPage === "recap" ? "active-tab" : ""
                    }`}
                  >
                    Recap
                  </button>
                </Link>
                <Link to="/social">
                  <button
                    className={`nav-btn ${
                      currPage === "social" ? "active-tab" : ""
                    }`}
                  >
                    Social
                  </button>
                </Link>
              </div>
              <div className="wrapper">
                <div className="account-links-logged-in">
                  <Link to="/profile">
                  <Tooltip hasArrow label='View Profile' 
                   bg={`${colorMode === "light" ? '#34B3F1' : "#2e2d2d"}`} color='#fff'>

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
                  </Tooltip>
                    
                  </Link>
                  {loggedInWithGoogle ? (
                    <Link to="/" className="google-logout">
                      <GoogleLogout
                        clientId={clientId}
                        buttontext="Log Out"
                        onLogoutSuccess={onLogoutSuccess}
                      ></GoogleLogout>
                    </Link>
                  ) : (
                    <>
                      <Link to="/" className="google-logout">
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
                <div className="burger-menu-logged-in">
                  <Popover>
                    <PopoverTrigger >                  
                      <IconButton
                        fontSize={"28px"}
                        size="lg"
                        aria-label="Search database"
                        icon={<HamburgerIcon />}
                        background={`${colorMode === "light" ? "#EDF2F7" : "whiteAlpha.200"}`}
                        _hover={{background:`${colorMode === "light" ? '#e4e9ee' : "#3b4963"}`}}

                      />
                    </PopoverTrigger>
                    <PopoverContent   w='200px' background={`${colorMode === "light" ? "#fff" : "#232c3c"}`}>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody>
                        <div className="burger-links ">
                          <>
                            <Link to="/dashboard" className="nav-btn-burger">
                              <button
                                className={`nav-btn ${
                                  currPage === "dashboard" ? "active-tab" : ""
                                }`}
                              >
                                Dashboard
                              </button>
                            </Link>
                            <Link to="/todo" className="nav-btn-burger">
                              <button
                                className={`nav-btn ${
                                  currPage === "todo" ? "active-tab" : ""
                                }`}
                              >
                                Todo
                              </button>
                            </Link>
                            <Link to="/recap" className="nav-btn-burger">
                              <button
                                className={`nav-btn ${
                                  currPage === "recap" ? "active-tab" : ""
                                }`}
                              >
                                Recap
                              </button>
                            </Link>
                            <Link to="/social" className="nav-btn-burger">
                              <button
                                className={`nav-btn ${
                                  currPage === "social" ? "active-tab" : ""
                                }`}
                              >
                                Social
                              </button>
                            </Link>
                          </>
                          {loggedInWithGoogle ? (
                            <Link to="/" className="google-logout-burger nav-btn-burger">
                              <GoogleLogout
                                clientId={clientId}
                                buttontext="Log Out"
                                onLogoutSuccess={onLogoutSuccess}
                              ></GoogleLogout>
                            </Link>
                          ) : (
                            <>
                              <Link to="/" className="nav-btn-burger">
                                <button
                                  className="nav-btn"
                                  onClick={() => {
                                    apiClient.logout();
                                    setUser(null);
                                  }}
                                >Log Out
                                </button>
                              </Link>
                            </>
                          )}
                        </div>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {currPage === "landing" ? (
            <>
              <div className="navbar d-flex flex-row justify-content-between">
                <div className="content d-flex flex-row justify-content-between">
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
                  <div className="account-links ">
                    <>
                      <Link to="/login">
                        <button className="nav-btn">Log In</button>
                      </Link>
                      <Link to="/register">
                        <button className="nav-btn">Register</button>
                      </Link>
                    </>
                  </div>
                  <div className="burger-menu">
                    <Popover>
                      <PopoverTrigger>
                        <IconButton
                          fontSize={"28px"}
                          size="lg"
                          aria-label="Search database"
                          icon={<HamburgerIcon />}
                          background={`${colorMode === "light" ? "#EDF2F7" : "whiteAlpha.200"}`}
                        _hover={{background:`${colorMode === "light" ? '#e4e9ee' : "#3b4963"}`}}
                        />
                      </PopoverTrigger>
                      <PopoverContent  w='200px' background={`${colorMode === "light" ? "#fff" : "#232c3c"}`}>

                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                          <div className="burger-links ">
                            <>
                              <Link to="/login">
                                <button className="nav-btn">Log In</button>
                              </Link>
                              <Link to="/register">
                                <button className="nav-btn">Register</button>
                              </Link>
                            </>
                          </div>
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
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
