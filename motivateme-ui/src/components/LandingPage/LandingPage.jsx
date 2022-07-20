import React from "react";
import RegisterPage from "../RegisterPage/RegisterPage";
import "./LandingPage.css";
import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
// import Hero from "../Hero/Hero";

export default function LandingPage( { setCurrPage } ) {
    React.useEffect(() => {
        setCurrPage("landing")
    }, [])
  
  return (
<div className="landing-page">
<h2 className="heading-text"> Get Organized and Stay Motivated</h2>
      <div className="header-text">
      <h4>Join others in shaking of stress by staying organized and celebrating your accomplishments small or large</h4>
    </div>
    <div className="header-button">
      <Link to="/register">
        <button type="button" className="getstarted-button">Get Started</button>
      </Link>
    </div>
    <br></br>
    <center><h2 className="middle-text">Here are the awesome benefits</h2></center>
    <div className="middle-section"> 
    <div className="textbox">
    <p>Track your quiz grades, exam scores, and more over time through our attractive and informative visualizations</p>
     </div> 
      <div className="textbox">
      <p>Track your daily activities with an
      easily accessible schedule viewer</p>
      </div>
      <div className="textbox">
        <p>Share your progress with your peers and motivate each other!</p>
      </div>
    </div>
    <div className="about-me">
      <div className="about-me-section">
      <h3>About Us</h3>
      <p className="about-me-text">
        MotivateMe was developed by highly ambitious CS undergrads looking to
        make a change in the academic world and help take stress off of students
        shoulders by offering a system for organizing assignments and tracking
        every single achievement for daily motivation!
      </p>
    </div>
    <div className="contact-section">
    <h2>Contact Us</h2>
    <p className="contact-info"> If there's any problems, feel free to reach out to us:</p> 
    </div>
    <div className="contacts">
    <p>Gikai: gikai.andrews.site@codepath.org</p>
    <p>Kian: kian.ranjbar.site@codepath.org</p>
    <p>Stephane: stephane.mbenga.site@codepath.org</p>
    </div>
    </div>
    </div>
  );
}
