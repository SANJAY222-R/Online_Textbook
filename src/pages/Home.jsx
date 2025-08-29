import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PdfUploader from '../components/PdfUploader';
import booksData from '../data/books.json';

const Home = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(booksData);
  }, []);

  const handlePdfUpload = (file) => {
    console.log('Uploaded PDF:', file);
    // In a real app, you would add the new book to your state here
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Library</h1>
          <p className="text-gray-600">Browse your collection or upload a new textbook to get started.</p>
        </div>

        {/* PDF Uploader Section */}
        <div className="mb-12">
          <PdfUploader onPdfUpload={handlePdfUpload} />
        </div>

        {/* Book Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {books.map((book) => (
            <div 
              key={book.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{book.title}</h2>
                <p className="text-gray-600 font-medium mb-4">{book.author}</p>
                <Link
                  to={`/reader/${book.id}`}
                  className="inline-block bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  Read Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;