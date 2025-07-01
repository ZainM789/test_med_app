// Import necessary modules from React library
// eslint-disable-next-line
import React, { useEffect } from 'react';

// Import components for routing from react-router-dom library
// eslint-disable-next-line
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import custom Navbar component
import Navbar from './Components/Navbar/Navbar';

// Import Landing_Page component
import Landing_Page from './components/Landing_Page/Landing_page';

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
            {/* Define Landing_Page as the Home route */}
            <Route path="/" element={<Landing_Page/>}/>
            {/* Define individual Route components for different pages */}
          </Routes>
        </BrowserRouter>
    </div>
  );
}

// Export the App component as the default export
export default App;