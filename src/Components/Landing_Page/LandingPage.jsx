import React from "react";
import "./LandingPage.css";

const LandingPage = () => {
  return (
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
            Welcome to our online medical booking system — fast, secure, and hassle-free. Find your doctor, choose a time, and confirm your visit in just a few clicks!
          </h4>
          <a href="../Login/Login.html">
            <button className="button">Get Started</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;