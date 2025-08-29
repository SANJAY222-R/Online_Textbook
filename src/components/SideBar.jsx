// src/components/Sidebar.jsx

import React from 'react';
import SectionList from './SectionList';

// **Accept onSectionClick as a prop**
const Sidebar = ({ sections, isLoading, onSectionClick }) => {
  return (
    <aside className="w-full h-full p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Table of Contents</h2>
      {isLoading ? (
        <p className="text-gray-500">Extracting sections...</p>
      ) : sections.length > 0 ? (
        // **Pass the prop down to SectionList**
        <SectionList sections={sections} onSectionClick={onSectionClick} />
      ) : (
        <p className="text-gray-500">No table of contents found in this PDF.</p>
      )}
    </aside>
  );
};

export default Sidebar;