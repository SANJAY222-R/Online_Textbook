import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const loadBook = async () => {
      try {
        const selectedBook = booksData.find((b) => b.id === bookId);
        if (!selectedBook) {
          throw new Error("Book not found");
        }
        setBook(selectedBook);
        setIsLoadingToc(true);
        const extractedToc = await parsePdfToc(selectedBook.file);
        setToc(extractedToc);
      } catch (err) {
        console.error("Error loading book:", err);
        setError(err.message);
      } finally {
        setIsLoadingToc(false);
      }
    };

    loadBook();
  }, [bookId]);

  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
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
          <Sidebar sections={toc} isLoading={isLoadingToc} />
        </aside>
        <main className="flex-1 overflow-y-auto">
          <PdfViewer file={book.file} />
        </main>
      </div>
    </div>
  );
};

export default Reader;
