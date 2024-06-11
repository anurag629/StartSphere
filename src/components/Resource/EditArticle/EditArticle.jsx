import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import Navbar from '../../Home/Navbar';
import { useDispatch } from 'react-redux';
import { updateArticle } from '../../../feature/articleSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import api from '../../../api/axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditArticle = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState('');
  const [contentBlocks, setContentBlocks] = useState([]);
  const [isDisable, setIsDisable] = useState(false);
  const userData = useSelector((state) => state.auth.userData);
  const profileData = useSelector((state) => state.profile.profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      const Article = await api.get(`/article/articles/${slug}`, {
        headers: {
          'Authorization': `Bearer ${userData.Token}`,
        },
      })
      setTitle(Article.data.article.title)
      setContentBlocks(Article.data.article.content)
    }
    fetchArticle();
  }, [])


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
    formData.append('cloud_name', 'dnjis096o');

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
    } finally {
      setIsDisable(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const toastId = toast.loading("Please wait...")
    const newArticle = {
      "title": title,
      "content": contentBlocks
    };

    try {
      const ArticleResponse = await api.put(`/article/articles/${slug}`, newArticle,
        {
          headers: {
            'Authorization': `Bearer ${userData.Token}`,
          },
        })

      toast.update(toastId, { render: "Article edited succesfully!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
      dispatch(updateArticle(ArticleResponse.data?.Article));
      navigate('/resources');
    } catch (error) {
      toast.update(toastId, { render: "Error in editing article!", type: "error", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
      console.error(error);
    }
    finally {
      setTitle('');
      setContentBlocks([]);
    }
  };

  return (
    <div className='bg-slate-800 h-screen overflow-x-scroll'>
      <Navbar />
      <div className="create-article-form bg-slate-700  p-4 shadow-md rounded mt-4 h-100 w-4/5 m-auto ">
        <h2 className="text-2xl font-bold mb-4 text-white flex justify-center">Edit Article</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              placeholder='Enter title...'
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">Content</label>
            {contentBlocks && contentBlocks.map((block, index) => (
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
                  <>
                    {!block.value ?
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e.target.files[0], index)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      : (
                        <img src={block.value} alt="uploaded" className="w-full mt-2" />
                      )}
                  </>
                )}
                {block.type === 'video' && (
                  <>
                    {!block.value ?
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileUpload(e.target.files[0], index)}
                        className="w-full p-2 border border-gray-300 rounded"
                      />
                      : (
                        <video src={block.value} controls className="w-full mt-2" />
                      )}
                  </>
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
                  <MdDelete />
                </button>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <button type="button" onClick={() => handleAddBlock('heading')} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">
              <div className='flex justify-center items-center'>
                <FaPlus /><span>Add Heading</span>
              </div>
            </button>
            <button type="button" onClick={() => handleAddBlock('subheading')} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">
              <div className='flex justify-center items-center'>
                <FaPlus /><span>Add SubHeading</span>
              </div>
            </button>
            <button type="button" onClick={() => handleAddBlock('text')} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">
              <div className='flex justify-center items-center'>
                <FaPlus /><span>Add Text</span>
              </div>
            </button>
            <button type="button" onClick={() => handleAddBlock('image')} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded">
              <div className='flex justify-center items-center'>
                <FaPlus /><span>Add Image</span>
              </div>
            </button>
            <button type="button" onClick={() => handleAddBlock('video')} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded ">
              <div className='flex justify-center items-center'>
                <FaPlus /><span>Add Video</span>
              </div>
            </button>
            <button type="button" onClick={() => handleAddBlock('list')} className="mr-2 bg-blue-500 text-white py-2 px-4 rounded ">
              <div className='flex justify-center items-center'>
                <FaPlus /><span>Add List</span>
              </div>
            </button>
          </div>
          <button type="submit" disabled={isDisable} className="bg-green-500 text-white py-2 px-4 rounded">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditArticle;
