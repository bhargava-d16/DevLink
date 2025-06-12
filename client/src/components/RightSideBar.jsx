import React from 'react'

const RightSideBar = ({ selectedUser }) => {
  if (!selectedUser) return null;
  return (
    <div className="bg-black/10 border-l border-gray-600 p-4">
      {/* Sidebar content */}
    </div>
  );
};

export default RightSideBar
