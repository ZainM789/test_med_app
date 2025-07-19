import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css'; // Temporarily commented out to bypass CSS encoding issues
import App from './App'; // App already imports and uses BrowserRouter internally
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Removed BrowserRouter here, as App.js already contains it */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();