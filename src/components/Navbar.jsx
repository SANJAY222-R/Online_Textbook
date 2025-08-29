import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
            <span className="font-bold text-xl">Online Textbook Reader</span>
          </Link>
          <div>
            <Link to="/" className="text-gray-600 hover:text-gray-800 px-3">
              Library
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
