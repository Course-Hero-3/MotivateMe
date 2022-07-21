import React from "react";
import RegisterPage from "../RegisterPage/RegisterPage";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import mainImg from "../../assets/Main_Img.png"
import scheduleImg from "../../assets/Schedule-Img.png"
import progressImg from "../../assets/Progress-Img.png"
import friendsImg from "../../assets/Friends-Img.png"
// import Navbar from "../Navbar/Navbar";
// import Hero from "../Hero/Hero";

export default function LandingPage( { setCurrPage } ) {
    React.useEffect(() => {
        setCurrPage("landing")
    }, [])
  
  return (
<div className="landing-page">
  <div className="landing-intro">
      <div className="landing-intro-main">
        <div className="landing-intro-main-text">
          <h2 className="heading-text"> Get Organized and Stay Motivated</h2>
          <h4 className="header-text">Join others in shaking of stress by staying organized and celebrating your accomplishments small or large</h4>
        </div>
        <div className="header-button">
          <Link to="/register">
            <button type="button" className="getstarted-button">Get Started</button>
          </Link>
        </div>
      </div>
     <div className="landing-intro-hero">
        <img src={mainImg} alt = "landing page hero image" className="hero-img"
        />
     </div>
  </div>

      <div className="landing-body">
        <div className="landing-body-header">
            <h2 className="landing-header">Here are the awesome benefits</h2>
        </div>
        <div className="landing-middle-section"> 
          <div className="textbox">
            <img src={progressImg} className = "middle-section-img"/>
            <div className="middle-section-text">
            <h3 className="textbox-header">Track your progress</h3>
            <p>Track your quiz grades, exam scores, and more over time through our attractive and informative visualizations</p>
          </div>
          </div> 
            <div className="textbox">
            <img src={scheduleImg} className = "middle-section-img"/>
            <div className="middle-section-text">
              <h3 className="textbox-header">Organize yourself</h3>
              <p>Track your daily activities with an
              easily accessible schedule viewer</p>
            </div>
            </div>
            <div className="textbox">
              <img src={friendsImg} className = "middle-section-img"/>
               <div className="middle-section-text">
                  <h3 className="textbox-header">Stay connected</h3>
                  <p>Share your progress with your peers and motivate each other!</p>
               </div>
            </div>
        </div>
      </div>
   
      <div className="landing-about">
        <div className="about-section-text">
          <h3 className="about-header">About Us</h3>
          <p className="about-main">
            MotivateMe was developed by highly ambitious CS undergrads looking to
            make a change in the academic world and help take stress off of students
            shoulders by offering a system for organizing assignments and tracking
            every single achievement for daily motivation!
          </p>
      </div>
      </div>
      <div className="contact-section">
        <h2>Contact Us</h2>
        <p className="contact-info"> If there's any problems, feel free to reach out to us:</p> 
        <div className="contacts">
         <div className="contact-link">
            <h3 className="dev-name">Gikai</h3>
            <h3 className="dev-email">Gikai.andrews.site@codepath.org</h3>
         </div>
         <div className="contact-link">
            <h3 className="dev-name">Kian</h3>
            <h3 className="dev-email">kian.ranjbar.site@codepath.org</h3>
          </div>
          <div className="contact-link">
            <h3 className="dev-name">Stephane</h3>
            <h3 className="dev-email">stephane.mbenga.site@codepath.org</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
