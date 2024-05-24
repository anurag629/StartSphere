import React from 'react';

const PostCard = ({ title, description, image, likes, comments, shares }) => {
  return (
    <div className="bg-gray-700 rounded-lg p-4 mb-4 text-white">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      {image && <img src={image} alt="Post" className="w-full h-auto mb-4 rounded" />}
      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M3.172 7.828a4 4 0 010-5.656L9.514 1.83l1.829 1.828-6.343 6.343a4 4 0 01-1.828-1.829zm-2.12 2.121a5.978 5.978 0 00-.615 1.385 5.978 5.978 0 00.615 6.786 6.005 6.005 0 007.433.934l.093-.078 6.364-6.364a4 4 0 010-5.657l1.828 1.829a4 4 0 010 5.657l-6.364 6.364a6.005 6.005 0 01-6.858.697l-.078-.093a5.978 5.978 0 01-.934-7.433 5.978 5.978 0 011.385-.615L1.05 9.95z" /></svg>
            {likes}
          </span>
          <span className="flex items-center">
            <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M5 11V5a1 1 0 011-1h9a1 1 0 011 1v6a1 1 0 011 1h1a1 1 0 011 1v2a1 1 0 01-1 1h-3v3a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3H6a1 1 0 01-1-1v-2a1 1 0 011-1h1z" /></svg>
            {comments}
          </span>
          <span className="flex items-center">
            <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M15 8a3 3 0 013 3 3 3 0 01-3 3H9.41l1.3 1.29a1 1 0 11-1.42 1.42l-3-3a1 1 0 010-1.42l3-3a1 1 0 011.42 1.42L9.41 11H15a1 1 0 000-2H8a1 1 0 100 2h1v-2a3 3 0 00-3-3H3a1 1 0 000 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 000 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 100 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 000 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 000 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 100 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 000 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 000 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 100 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 100 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 100 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 000 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 100 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 000 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 000 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 000 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 000 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 000 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 000 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 100 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3V9a3 3 0 00-3-3H3a1 1 0 100 2h2a1 1 0 011 1v2a1 1 0 01-1 1H3a1 1 0 000 2h2a3 3 0 003-3z" /></svg>
            {shares}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
