// Import necessary modules from React library
// eslint-disable-next-line
import React, { useEffect } from 'react';

// Import components for routing from react-router-dom library
// eslint-disable-next-line
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';

// Import LandingPage component (fix: use PascalCase for import & usage)
import LandingPage from './Components/Landing_Page/LandingPage';

// Import SignUp and Login components
import SignUp from './Components/SignUp/SignUp';
import Login from './Components/Login/Login';

// Function component for the main App
function App() {

  // Render the main App component
  return (
    <div className="App">
        {/* Set up BrowserRouter for routing */}
        <BrowserRouter>
          {/* Display the Navbar component */}
          <Navbar/>

          {/* Set up the Routes for different pages */}
          <Routes>
            {/* Define LandingPage as the Home route */}
            <Route path="/" element={<LandingPage/>}/>
            {/* Define SignUp and Login routes */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;