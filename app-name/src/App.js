import { Route, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import InstantConsultation from './Components/InstantConsultation/InstantConsultation';

function App() {
  return (
    <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
    <Routes>
      <Route path="/" element={<InstantConsultation />} />
      {/* or if you want both, add: */}
      <Route path="/instant-consultation" element={<InstantConsultation />} />
    </Routes>
  </div>
  );
}

export default App;
