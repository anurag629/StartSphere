import React from 'react';

const SkeletonSidebar = () => {
  return (
    <aside className="w-1/4 h-screen bg-gray-200 p-5 shadow-lg overflow-y-auto no-scrollbar dark:bg-gray-900 animate-pulse">
      <div className="flex items-center space-x-4 pb-4">
        <div className="w-full bg-gray-300 h-12 rounded flex items-center justify-center">
          <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
          <div className="ml-2 w-24 h-6 bg-gray-400 rounded"></div>
        </div>
      </div>
      <div className="w-full p-2 mb-5 bg-gray-300 h-10 rounded"></div>
      <div className="article-menu">
        <ul className="list-none p-0 space-y-2">
          {[...Array(10)].map((_, index) => (
            <li key={index} className="p-2 bg-gray-300 h-10 rounded"></li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default SkeletonSidebar;
