import React from "react";
import RegisterPage from "../RegisterPage/RegisterPage";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import mainImg from "../../assets/Main_Img.png";
import scheduleImg from "../../assets/Schedule-Img.png";
import progressImg from "../../assets/Progress-Img.png";
import friendsImg from "../../assets/Friends-Img.png";
// import Navbar from "../Navbar/Navbar";
// import Hero from "../Hero/Hero";

export default function LandingPage({ setCurrPage }) {
  React.useEffect(() => {
    setCurrPage("landing");
  }, []);

  return (
    <div className="landing-page">
      <div className="landing-intro">
        <div className="landing-intro-main">
          <h2 className="heading-text">Get Organized and Stay Motivated</h2>
          <p className="header-text">
            Join others in shaking off stress by staying organized and
            celebrating your accomplishments big or small.
          </p>
          <div className="header-button">
            <Link to="/register">
              <button type="button" className="getstarted-button">
                Get Started
              </button>
            </Link>
          </div>
        </div>
        <div className="landing-intro-hero">
          <img
            src={mainImg}
            alt="landing page hero image"
            className="hero-img"
          />
        </div>
      </div>

      <div className="landing-body">
        <div className="landing-body-header">
          <h2 className="landing-header">Here are the Awesome Benefits</h2>
        </div>
        <div className="landing-middle-section">
          <div className="textbox">
            <img src={progressImg} className="middle-section-img" />
            <div className="middle-section-text">
              <h3 className="textbox-header">Track Your Progress</h3>
              <p>
                Track your exam efficiency, homework due dates, project scores,
                and more through our attractive and informative visualizations.
              </p>
            </div>
          </div>
          <div className="textbox">
            <img src={scheduleImg} className="middle-section-img" />
            <div className="middle-section-text">
              <h3 className="textbox-header">Organize Yourself</h3>
              <p>
                Track your daily activities with an easily accessible schedule
                viewer.
              </p>
            </div>
          </div>
          <div className="textbox">
            <img src={friendsImg} className="middle-section-img" />
            <div className="middle-section-text">
              <h3 className="textbox-header">Stay Connected</h3>
              <p>
                Share your progress with your peers and motivate each other!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="landing-about">
        <div className="about-section-text">
          <h3 className="about-header">About Us</h3>
          <p className="about-main">
            MotivateMe was developed by highly ambitious Computer Science
            undergraduates looking to make a change in the academic world and
            help take stress off of students' shoulders by offering a system for
            organizing assignments and tracking achievements for daily
            motivation!
          </p>
        </div>
      </div>
      <div className="contact-section">
        <div className="contact-info">
          <h1 className="contact-header">Get in Touch!</h1>
          <div className="contacts">
            <div className="contact-footer-wrapper">
              <div className="contact-footer-column">
                  <h3 className="footer-column-header">Developers</h3>
                  <p className="dev-name">Gikai Andrews</p>
                  <p className="dev-name">Stephane Mbenga</p>
                  <p className="dev-name">Kian Ranjbar</p>
              </div>
              <div className="contact-footer-column">
                  <h3 className="footer-column-header">Contact</h3>
                  <p className="dev-email">gikai.andrews.site@codepath.org</p>
                  <p className="dev-email">
                    stephane.mbenga.site@codepath.org
                  </p>
                  <p className="dev-email">kian.ranjbar.site@codepath.org</p>
              </div>

              <div className="contact-footer-column">
                  <h3 className="footer-column-header">Company</h3>
                  <p className="dev-name">Terms</p>
                  <p className="dev-email">Privacy</p>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-company-text">
          <p className="footer-text">@2022 MotivateMe</p>
          <p className="footer-text">Terms</p>
          <p className="footer-text">Privacy</p>
        </div>
      </div>
    </div>
  );
}
