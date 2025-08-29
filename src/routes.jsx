import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reader from './pages/Reader';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/reader/:bookId" element={<Reader />} />
    </Routes>
  );
};

export default AppRoutes;
