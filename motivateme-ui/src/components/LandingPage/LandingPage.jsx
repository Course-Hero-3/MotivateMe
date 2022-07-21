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
          <h2 className="heading-text"> Get Organized and Stay Motivated</h2>
          <p className="header-text">Join others in shaking of stress by staying organized and celebrating your accomplishments small or large</p>
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
        <div className="contact-info">
        <h1 className="contact-header">Get in Touch!</h1>      
          <div className="contacts">
            <div className="contact-footer-wrapper">
            <img id="home-logo" className = "footer" src="https://cdn-icons-png.flaticon.com/512/2163/2163301.png" alt="Home Logo" />

            <div className="contact-footer-column">
                <ul>
                <h3 className="footer-column-header">Developers</h3>
                <li className="dev-name">Gikai</li>
                <li className="dev-name">Stephane</li>
                <li className="dev-name">Kian</li>
                </ul>
                
            </div>
            <div className="contact-footer-column">
              <ul>
              <h3 className="footer-column-header">Contact</h3>
                <li className="dev-email"> Gikai.andrews.site@codepath.org</li>
                <li className="dev-email">kian.ranjbar.site@codepath.org</li>
                <li className="dev-email">stephane.mbenga.site@codepath.org</li>
              </ul>
              </div>
              
              <div className="contact-footer-column">
                <ul>
                <h3 className="footer-column-header">Company</h3>
                  <li className="dev-name">Login</li>
                  <li className="dev-email">Register</li>
                </ul>
              </div>
            </div>
          
          </div>
        </div>
        <div className="footer-company-text">
          <p className="footer-text">@2022 MotivateMe   </p>
          <p className="footer-text">Terms </p>
          <p className="footer-text">Privacy </p>

        </div>
      </div>
    </div>
  );
}
