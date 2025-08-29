import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Corrected CSS IMPORTS for modern react-pdf versions
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// THIS IS THE FIX: Set the worker source to a reliable CDN instead of trying to import it.
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const PdfViewer = ({ file }) => {
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  return (
    <div className="flex justify-center w-full h-full bg-gray-200 overflow-auto p-4">
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div className="text-lg font-semibold">Loading PDF...</div>}
        error={<div className="p-4 text-lg text-red-500 bg-white rounded shadow">Failed to load PDF file.</div>}
      >
        {Array.from(new Array(numPages || 0), (el, index) => (
          <div key={`page_${index + 1}`} className="mb-4 shadow-lg">
            <Page
              pageNumber={index + 1}
              width={Math.min(800, window.innerWidth - 60)} // Make page width responsive
            />
          </div>
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;
