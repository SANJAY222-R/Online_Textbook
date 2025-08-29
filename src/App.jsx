import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reader from './pages/Reader';

// Notice: No Router and no Provider here.
// They are in main.jsx now.
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reader/:bookId" element={<Reader />} />
    </Routes>
  );
}

export default App;