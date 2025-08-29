import React from 'react';
import SectionList from './SectionList';

const Sidebar = ({ sections, isLoading }) => {
  return (
    <aside className="w-full h-full p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Table of Contents</h2>
      {isLoading ? (
        <p className="text-gray-500">Extracting sections...</p>
      ) : sections.length > 0 ? (
        <SectionList sections={sections} />
      ) : (
        <p className="text-gray-500">No table of contents found in this PDF.</p>
      )}
    </aside>
  );
};

export default Sidebar;