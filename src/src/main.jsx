// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // Sin llaves en la importación

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
