// src/components/PostCreation.js
import React, { useState } from 'react';
import PostCreateModel from './Post/PostCreateModel';

const PostCreation = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle post submission logic here
    handleCloseModal();
  };

  return (
    <div>
      <div className="bg-gray-700 p-4 rounded-lg text-white mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gray-600"></div>
          <input 
            type="text" 
            placeholder="Start a post" 
            className="w-full p-2 rounded bg-gray-600 border border-gray-500"
            onClick={handleOpenModal}
            readOnly 
          />
        </div>
      </div>

      <PostCreateModel isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl text-white mb-4">Create a Post</h2>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input type="text" className="w-full p-2 rounded bg-gray-600 border border-gray-500" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea className="w-full p-2 rounded bg-gray-600 border border-gray-500" rows="4" required></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Image Upload</label>
            <input type="file" className="w-full p-2 rounded bg-gray-600 border border-gray-500" />
          </div>
          <button type="submit" className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">Post</button>
        </form>
      </PostCreateModel>
    </div>
  );
};

export default PostCreation;
