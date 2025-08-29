import React, { createContext, useState } from 'react';
import booksData from '../data/books.json'; // Your initial books

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(booksData);

  const addBook = (file) => {
    // Create a temporary URL for the PDF file object
    const fileUrl = URL.createObjectURL(file);

    const newBook = {
      // Create a unique ID from the file name and current time
      id: `${file.name}-${Date.now()}`,
      title: file.name.replace(/\.pdf$/i, ''), // Remove .pdf extension for the title
      author: 'Uploaded Textbook',
      file: fileUrl,
      toc: [], // Uploaded books won't have an auto-generated TOC
    };

    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  return (
    <BookContext.Provider value={{ books, addBook }}>
      {children}
    </BookContext.Provider>
  );
};