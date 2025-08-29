// src/components/SectionList.jsx

import React from 'react';

// **Accept onSectionClick as a prop**
const SectionList = ({ sections, onSectionClick }) => {
  const handleClick = (e, page) => {
    e.preventDefault(); // Prevent the default link behavior
    onSectionClick(page);
  };

  return (
    <ul>
      {sections.map((section, index) => (
        <li key={index} className="mb-2">
          {/* **Change the link to use an onClick handler** */}
          <a
            href={`#page=${section.page}`}
            onClick={(e) => handleClick(e, section.page)}
            className="text-gray-700 hover:underline cursor-pointer"
          >
            {section.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SectionList;