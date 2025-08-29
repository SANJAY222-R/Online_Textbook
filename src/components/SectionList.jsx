import React from 'react';

const SectionList = ({ sections }) => {
  return (
    <ul>
      {sections.map((section, index) => (
        <li key={index} className="mb-2">
          <a href={`#page=${section.page}`} className="text-gray-700 hover:underline">
            {section.title}
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SectionList;