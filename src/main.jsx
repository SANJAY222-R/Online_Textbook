import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import './index.css'; // Make sure your main css is imported

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* The single, top-level router wraps everything */}
    <BrowserRouter>
      {/* The context provider is inside the router */}
      <BookProvider>
        <App />
      </BookProvider>
    </BrowserRouter>
  </React.StrictMode>
);