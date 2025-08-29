// src/components/Reader.jsx

import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PdfViewer from "../components/PdfViewer";
import booksData from "../data/books.json";
import { parsePdfToc } from "../utils/pdfParser";

const Reader = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [toc, setToc] = useState([]);
  const [isLoadingToc, setIsLoadingToc] = useState(true);
  const [error, setError] = useState(null);

  // **Create a ref to hold references to each page's container div**
  const pageRefs = useRef({});

  useEffect(() => {
    const loadBookData = async () => {
      const selectedBook = booksData.find((b) => b.id === bookId);

      if (!selectedBook) {
        setError("Book not found");
        setIsLoadingToc(false);
        return;
      }
      
      setBook(selectedBook);

      if (selectedBook.toc && selectedBook.toc.length > 0) {
        setToc(selectedBook.toc);
        setIsLoadingToc(false);
      } else {
        try {
          const extractedToc = await parsePdfToc(selectedBook.file);
          setToc(extractedToc);
        } catch (err) {
          console.error("Failed to parse PDF:", err);
          setError("Could not parse the PDF file.");
        } finally {
          setIsLoadingToc(false);
        }
      }
    };

    loadBookData();
  }, [bookId]);
  
  // **Function to handle scrolling to a specific page**
  const handleSectionClick = (pageNumber) => {
    const pageRef = pageRefs.current[pageNumber];
    if (pageRef) {
      pageRef.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };


  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  if (!book) {
    return <div className="flex justify-center items-center h-screen">Loading Book...</div>;
  }

  return (
    <div className="flex flex-col h-screen font-sans">
      <Navbar />
      <div className="flex flex-1 overflow-hidden bg-gray-100">
        <aside className="w-80 bg-white shadow-lg overflow-y-auto hidden md:block">
          {/* **Pass the click handler function to the Sidebar** */}
          <Sidebar sections={toc} isLoading={isLoadingToc} onSectionClick={handleSectionClick} />
        </aside>
        <main className="flex-1 overflow-y-auto">
          {/* **Pass the pageRefs object to the PdfViewer** */}
          <PdfViewer file={book.file} pageRefs={pageRefs} />
        </main>
      </div>
    </div>
  );
};

export default Reader;