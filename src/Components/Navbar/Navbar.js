import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/" className="logo-link">
                    <span className="logo-text">Medic4U</span>
                </Link>
            </div>
            <ul className="navbar-menu">
                <li>
                    <Link to="/appointments" className="navbar-link" id="appointments-link">
                        <i className="fa-regular fa-calendar"></i>
                        Appointments
                    </Link>
                </li>
                <li>
                    <Link to="/reviews" className="navbar-link" id="reviews-link">
                        <i className="fa-solid fa-book"></i>
                        Reviews
                    </Link>
                </li>
                <li>
                    <Link to="/Sign_Up" className="navbar-link" id="Sign_Up-link">
                        <i className="fa-solid fa-user"></i>
                        Sign Up
                    </Link>
                </li>
                <li>
                    <Link to="/Login" className="navbar-link" id="Login-link">
                        <i className="fa-solid fa-right-to-bracket"></i>
                        Login
                    </Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;