// src/components/PdfViewer.jsx

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// **Accept pageRefs as a prop**
const PdfViewer = ({ file, pageRefs }) => {
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
          // **Attach the ref to this container div**
          <div
            key={`page_${index + 1}`}
            ref={(el) => (pageRefs.current[index + 1] = el)}
            className="mb-4 shadow-lg"
          >
            <Page
              pageNumber={index + 1}
              width={Math.min(800, window.innerWidth - 60)}
            />
          </div>
        ))}
      </Document>
    </div>
  );
};

export default PdfViewer;