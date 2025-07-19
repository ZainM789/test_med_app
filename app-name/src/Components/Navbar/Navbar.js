import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import ProfileCard from '../ProfileCard/ProfileCard';

const Navbar = () => {
  // State for authentication
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
    setUsername('');
    setIsMobileMenuOpen(false);
    window.location.reload();
  };

  // Check login status on mount
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');
    if (storedEmail) {
      setIsLoggedIn(true);
      setUsername(storedEmail.split('@')[0]);
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/" className="logo-link">
          <span className="logo-text">Medic4U</span>
        </Link>
      </div>
      
      {/* Mobile Menu Button */}
      <button 
        className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Toggle mobile menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      
      <ul className={`navbar-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
        <li>
          <Link to="/appointments" className="navbar-link" id="appointments-link" onClick={closeMobileMenu}>
            <i className="fa-regular fa-calendar"></i>
            Appointments
          </Link>
        </li>
        <li>
          <Link to="/reviews" className="navbar-link" id="reviews-link" onClick={closeMobileMenu}>
            <i className="fa-solid fa-star"></i>
            Reviews
          </Link>
        </li>
        
        {/* Reports Dropdown */}
        <li className="navbar-dropdown">
          <Link to="/reports" className="navbar-link" id="reports-link" onClick={closeMobileMenu}>
            <i className="fa-solid fa-file-medical"></i>
            Your Reports
          </Link>
        </li>

        {!isLoggedIn && (
          <>
            <li>
              <Link to="/signup" className="navbar-link" id="signup-link" onClick={closeMobileMenu}>
                <i className="fa-solid fa-user-plus"></i>
                Sign Up
              </Link>
            </li>
            <li>
              <Link to="/login" className="navbar-link" id="login-link" onClick={closeMobileMenu}>
                <i className="fa-solid fa-right-to-bracket"></i>
                Login
              </Link>
            </li>
          </>
        )}

        {isLoggedIn && (
          <>
            <li>
              <Link to="/profile" className="navbar-link" id="profile-link" onClick={closeMobileMenu}>
                <i className="fa-solid fa-user"></i>
                Welcome, {username}
              </Link>
            </li>
            <li>
              <button 
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }} 
                className="navbar-link logout-btn" 
                id="logout-btn"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
