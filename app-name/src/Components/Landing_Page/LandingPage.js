import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

const Landing_Page = () => {
  return (
    <>
      <section className="hero-section">
        <div>
          <div data-aos="fade-up" className="flex-hero">
            <h1>
              Your Health<br />
              <span className="text-gradient">
                Our Responsibility
              </span>
            </h1>
            <div className="blob-cont">
              <div className="blue blob"></div>
            </div>
            <div className="blob-cont">
              <div className="blue1 blob"></div>
            </div>
            <h4>
              Welcome to our online medical booking system — fast, secure, and hassle-free.
              Find your doctor, choose a time, and confirm your visit in just a few clicks!
            </h4>
            <div className="action-buttons">
              <Link to="/login">
                <button className="button">Get Started</button>
              </Link>
              <Link to="/reports">
                <button className="button secondary">View Reports</button>
              </Link>
            </div>
            
            {/* Additional features section */}
            <div className="features-highlight">
              <div className="feature-item">
                <span className="feature-icon">⚡</span>
                <span>Fast Booking</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🔒</span>
                <span>Secure Platform</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">👨‍⚕️</span>
                <span>Expert Doctors</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Bottom spacing section */}
      <section className="bottom-spacer">
        <div className="spacer-content">
          <p>Your health journey starts here. Book your appointment today!</p>
        </div>
      </section>
    </>
  );
};

export default Landing_Page;
