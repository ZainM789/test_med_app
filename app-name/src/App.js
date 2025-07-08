import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Notification from './Components/Notification/Notification';
import LandingPage from './Components/Landing_Page/LandingPage';
import Login from './Components/Login/Login'; 
import SignUp from './Components/SignUp/SignUp'; 
import InstantConsultation from './Components/InstantConsultation/InstantConsultation'; 
import BookingConsultation from './Components/InstantConsultation/BookingConsultation'; 
import Navbar from './Components/Navbar/Navbar'; 
import ReviewForm from './Components/ReviewForm/ReviewForm'; 

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <BrowserRouter>
        {/* Navbar added here, outside of Routes, so it appears on all pages */}
        <Navbar />

        <Notification>
          <Routes>
            {/* LandingPage added as the default home route */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/booking-consultation" element={<BookingConsultation />} />
            {/* New route for the Reviews page */}
            <Route path="/reviews" element={<ReviewForm />} /> 
            {/* Add more routes as needed */}
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;
