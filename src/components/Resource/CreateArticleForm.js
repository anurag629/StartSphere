import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import axios from 'axios';
import Navbar from '../Home/Navbar';

const CreateArticleForm = ({ addNewArticle }) => {
  const [title, setTitle] = useState('');
  const [contentBlocks, setContentBlocks] = useState([]);
  const [isDisable,setIsDisable]= useState(false);
  const handleAddBlock = (type) => {
    setContentBlocks([...contentBlocks, { type, value: '' }]);
  };
  const handleContentChange = (index, value) => {
    const newBlocks = [...contentBlocks];
    newBlocks[index].value = value;
    setContentBlocks(newBlocks);
  };

  const handleRemoveBlock = (index) => {
    const newBlocks = contentBlocks.filter((_, i) => i !== index);
    setContentBlocks(newBlocks);
  };

  const handleFileUpload = async (file, index) => {
    setIsDisable(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'auenhckk');
    formData.append('cloud_name', 'dnjis096o'); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dnjis096o/upload`,
        formData
      );
      const newBlocks = [...contentBlocks];
      newBlocks[index].value = response.data.secure_url;
      setContentBlocks(newBlocks);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
    setIsDisable(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newArticle = {
      id: Math.random(),
      title,
      content: contentBlocks,
    };
    // addNewArticle(newArticle);
    console.log(newArticle);
    setTitle('');
    setContentBlocks([]);
  };

  return (
    <div>
    <Navbar/>
    <div className="create-article-form bg-white p-4 shadow-md rounded mt-4 h-100 w-4/5 m-auto">
      <h2 className="text-2xl font-bold mb-4">Create New Article</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Content</label>
          {contentBlocks.map((block, index) => (
            <div key={index} className="flex items-center mb-2">
              {block.type === 'text' && (
                <textarea
                  value={block.value}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter text"
                />
              )}
              {block.type === 'image' && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files[0], index)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              )}
              {block.type === 'video' && (
                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileUpload(e.target.files[0], index)}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              )}
              {block.type === 'heading' && (
                <input
                  type="text"
                  value={block.value}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter heading"
                />
              )}
              {block.type === 'subheading' && (
                <input
                  type="text"
                  value={block.value}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter subheading"
                />
              )}
              {block.type === 'list' && (
                <textarea
                  value={block.value}
                  onChange={(e) => handleContentChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter list items separated by commas"
                />
              )}
              <button type="button" onClick={() => handleRemoveBlock(index)} className="ml-2 text-red-500 hover:text-red-700">
                <MdDelete/>
              </button>
            </div>
          ))}
        </div>
        <div className="mb-4">
          <button type="button" onClick={() => handleAddBlock('heading')} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">
          <div className='flex justify-center items-center'>
            <FaPlus/><span>Add Heading</span>
            </div>
          </button>
          <button type="button" onClick={() => handleAddBlock('subheading')} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">
          <div className='flex justify-center items-center'>
            <FaPlus/><span>Add SubHeading</span>
            </div>
          </button>
          <button type="button" onClick={() => handleAddBlock('text')} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">
          <div className='flex justify-center items-center'>
            <FaPlus/><span>Add Text</span>
            </div>
          </button>
          <button type="button" onClick={() => handleAddBlock('image')} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">
          
          <div className='flex justify-center items-center'>
            <FaPlus/><span>Add Image</span>
            </div>
          </button>
          <button type="button" onClick={() => handleAddBlock('video')} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded ">
            <div className='flex justify-center items-center'>
            <FaPlus/><span>Add Video</span>
            </div>
          </button>
          <button type="button" onClick={() => handleAddBlock('list')} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded ">
            <div className='flex justify-center items-center'>
            <FaPlus/><span>Add List</span>
            </div>
          </button>
        </div>
        <button type="submit" disabled={isDisable} className="bg-green-500 text-white py-2 px-4 rounded">
          Create Article
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateArticleForm;
