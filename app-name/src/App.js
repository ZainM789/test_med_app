import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';
import BookingConsultation from './Components/InstantConsultation/BookingConsultation'; // Import BookingConsultation

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <Routes>
        <Route path="/" element={<InstantConsultation />} />
        {/* Route for InstantConsultation */}
        <Route path="/instant-consultation" element={<InstantConsultation />} />
        {/* Route for BookingConsultation */}
        <Route path="/booking-consultation" element={<BookingConsultation />} />
      </Routes>
    </div>
  );
}

export default App;
