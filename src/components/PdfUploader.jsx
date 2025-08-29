import React, { useState } from 'react';

const PdfUploader = ({ onPdfUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      onPdfUpload(file);
    }
  };

  return (
    <div className="p-4 border-dashed border-2 border-gray-300 rounded-lg text-center">
      <input type="file" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Upload New Textbook
      </button>
    </div>
  );
};

export default PdfUploader;