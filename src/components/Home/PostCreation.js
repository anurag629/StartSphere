// src/components/PostCreation.js
import React from 'react';

const PostCreation = () => {
  return (
    <div className="bg-gray-700 p-4 rounded-lg text-white mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-gray-600"></div>
        <input type="text" placeholder="Start a post" className="w-full p-2 rounded bg-gray-600 border border-gray-500" />
      </div>
    </div>
  );
};

export default PostCreation;
