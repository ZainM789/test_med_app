import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

// Components
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import BookingConsultation from './Components/InstantConsultation/BookingConsultation';
import Notification from './Components/Notification/Notification';

// Add your other components
import Login from './Components/Auth/Login'; // example path
import SignUp from './Components/Auth/SignUp'; // example path

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
