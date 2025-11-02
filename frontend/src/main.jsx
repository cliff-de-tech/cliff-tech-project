import React from 'react';
import ReactDOM from 'react-dom/client';
// Correct the import path to find the App component
import App from '../../cliff-tech-app.jsx';
import './index.css'; // This path is correct, assuming index.css is in the same /src folder

// This is the standard way to start a React 18 app.
// It finds the <div id="root"> in your index.html
// and injects your <App /> component into it.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);