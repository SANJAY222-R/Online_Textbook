import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PdfViewer from "../components/PdfViewer";
import { BookContext } from '../context/BookContext'; // Import the context
import { parsePdfToc } from "../utils/pdfParser";

const Reader = () => {
  const { bookId } = useParams();
  // Get the list of all books from the context
  const { books } = useContext(BookContext);

  const [book, setBook] = useState(null);
  const [toc, setToc] = useState([]);
  const [isLoadingToc, setIsLoadingToc] = useState(true);
  const [error, setError] = useState(null);
  const pageRefs = useRef({});

  useEffect(() => {
    const loadBookData = async () => {
      // Find the selected book from the context's state
      const selectedBook = books.find((b) => b.id === bookId);

      if (!selectedBook) {
        setError("Book not found");
        setIsLoadingToc(false);
        return;
      }
      
      setBook(selectedBook);

      // First, check for a manually defined TOC in the JSON data.
      if (selectedBook.toc && selectedBook.toc.length > 0) {
        setToc(selectedBook.toc);
        setIsLoadingToc(false);
      } else {
        // If no manual TOC is found, THEN try to parse the PDF automatically.
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

    // Ensure books from context are loaded before trying to find one
    if (books.length > 0) {
      loadBookData();
    }
  }, [bookId, books]);
  
  // Handles scrolling to the page clicked in the sidebar
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
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-red-500 p-4 bg-white rounded shadow-md">Error: {error}</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Book...
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen font-sans">
      <Navbar />
      <div className="flex flex-1 overflow-hidden bg-gray-100">
        <aside className="w-80 bg-white shadow-lg overflow-y-auto hidden md:block">
          <Sidebar sections={toc} isLoading={isLoadingToc} onSectionClick={handleSectionClick} />
        </aside>
        <main className="flex-1 overflow-y-auto">
          <PdfViewer file={book.file} pageRefs={pageRefs} />
        </main>
      </div>
    </div>
  );
};

export default Reader;