import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation'; // Assuming InstantConsultation.js exists within InstantConsultation folder
import BookingConsultation from './Components/InstantConsultation/BookingConsultation'; // Assuming BookingConsultation.js exists within InstantConsultation folder
import Notification from './Components/Notification/Notification';
import Login from './Components/Login/Login'; 
import SignUp from './Components/SignUp/SignUp'; 

function App() {
  return (
    <div className="App">
     <img src={logo} className="App-logo" alt="logo" />
      <BrowserRouter>
        <Notification>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/instant-consultation" element={<InstantConsultation />} />
            <Route path="/booking-consultation" element={<BookingConsultation />} />
            {/* Add more routes as needed */}
          </Routes>
        </Notification>
      </BrowserRouter>
    </div>
  );
}

export default App;
