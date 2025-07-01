import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="../Landing_Page/LandingPage.html" className="logo-link">
                    <span className="logo-text">Medic4U</span>
                </a>
            </div>
            <ul className="navbar-menu">
                <li>
                    <a href="../Landing_Page/LandingPage.html" className="navbar-link" id="appointments-link">
                        <i className="fa-regular fa-calendar"></i>
                        Appointments
                    </a>
                </li>
                <li>
                    <a href="../Landing_Page/LandingPage.html" className="navbar-link" id="reviews-link">
                        <i className="fa-solid fa-book"></i>
                        Reviews
                    </a>
                </li>
                <li>
                    <a href="../Sign_Up/Sign_Up.html" className="navbar-link" id="Sign_Up-link">
                        <i className="fa-solid fa-user"></i>
                        Sign Up
                    </a>
                </li>
                <li>
                    <a href="../Login/Login.html" className="navbar-link" id="Login-link">
                        <i className="fa-solid fa-right-to-bracket"></i>
                        Login
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;