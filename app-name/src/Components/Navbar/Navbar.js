import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import ProfileCard from '../ProfileCard/ProfileCard';

const Navbar = () => {
  // State for mobile nav and authentication
  const [click, setClick] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // eslint-disable-next-line
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  // Mobile menu toggle
  const handleClick = () => setClick(!click);

  // Logout function: clears session/local storage and reloads
  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('email');
    sessionStorage.removeItem('phone');
    localStorage.removeItem('doctorData');
    // Remove all reviewFormData items
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const key = localStorage.key(i);
      if (key && key.startsWith('reviewFormData_')) {
        localStorage.removeItem(key);
      }
    }
    setIsLoggedIn(false);
    setEmail('');
    setUsername('');
    window.location.reload();
  };

  // Check login status on mount
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setIsLoggedIn(true);
      setEmail(storedEmail);
      setUsername(storedEmail.split('@')[0]);
    } else {
      setIsLoggedIn(false);
      setEmail('');
      setUsername('');
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <span className="logo-text">Medic4U</span>
        </Link>
        <div className="nav__icon" onClick={handleClick}>
          <i className={click ? "fa fa-times" : "fa fa-bars"}></i>
        </div>
      </div>
      <ul className={click ? "navbar-menu active" : "navbar-menu"}>
        <li>
          <Link to="/appointments" className="navbar-link" id="appointments-link" onClick={() => setClick(false)}>
            <i className="fa-regular fa-calendar"></i>
            Appointments
          </Link>
        </li>
        <li>
          <Link to="/reviews" className="navbar-link" id="reviews-link" onClick={() => setClick(false)}>
            <i className="fa-solid fa-book"></i>
            Reviews
          </Link>
        </li>
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/SignUp" className="navbar-link" id="SignUp-link" onClick={() => setClick(false)}>
                <i className="fa-solid fa-user"></i>
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/Login" className="navbar-link" id="Login-link" onClick={() => setClick(false)}>
                <i className="fa-solid fa-right-to-bracket"></i>
                Login
              </Link>
            </li>
          </>
        )}
        {isLoggedIn && (
        <li
            style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "12px",
            position: "relative"
            }}
        >
            <span style={{ marginRight: "8px" }}>
            Welcome, <b>{username}</b>
            </span>

            {/* Toggle dropdown */}
            <div className="dropdown">
            <button className="dropdown-toggle">
                Your Profile
            </button>
            <div className="dropdown-menu">
                <ProfileCard
                user={{
                    name: username,
                    email: sessionStorage.getItem('email'),
                    role: 'User'
                }}
                />
            </div>
            </div>

            <button
            className="navbar-link"
            id="logout-button"
            style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                padding: "0 10px"
            }}
            onClick={handleLogout}
            >
            Logout
            </button>
        </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
