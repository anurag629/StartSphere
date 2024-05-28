import React, { useState } from 'react';
import PostCreateModel from './Post/PostCreateModel';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, updatePost } from '../../feature/postSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../../api/axios';

const PostCreation = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  function getCurrentDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString();  // Format: MM/DD/YYYY
    const time = now.toLocaleTimeString();  // Format: HH:MM:SS AM/PM

    return `${date} ${time}`;
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setImage(null);
  };

  const handleUpload = async () => {
    if (!image) {
      setErrorMessage('No file selected or file type is not an image');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', 'auenhckk');
    formData.append('cloud_name', 'dnjis096o');

    try {
      const response = await axios.post('https://api.cloudinary.com/v1_1/dnjis096o/image/upload', formData);
      setUploadedFile(response.data.secure_url);
      // setImageId(response.data.public_id);
      setErrorMessage('');
      console.log("response", response)
      console.log("response url", response.data.secure_url)
      // console.log("response public id", response.data.public_id)
    } catch (error) {
      console.error('Error uploading file:', error);
      setErrorMessage('Error uploading file');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (post) {
      // Update Post
      console.log("Update Post")
      const updatedPost = {
        ...post,
        updatedAt: getCurrentDateTime(),
        Title: title || post.Title,
        Image: image || post.Image,
        Description: description || post.Description
      }
      dispatch(updatePost(updatedPost))
      navigate(`/post/${updatedPost._id}`)
    }
    else {
      // Create Post
      console.log("Create Post")

      // handleUpload();
      const newPost = {
        Image: "https://res.cloudinary.com/dnjis096o/image/upload/v1716868344/sbunyrnmkh6swgfgzy9l.jpg",
        Title: title,
        Description: description
      }
      try {
        const response = await api.post(`post/createpost/${userData._id}`,
          newPost,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${userData.Token}`,
            },
          }
        );

        alert('Post created successfully');
        console.log(response);
        dispatch(addPost(response.data.post))
        navigate(`/post/${response.data.post._id}`)
      } catch (error) {
        alert('Error creating post');
        console.error(error);
      }
    }
    handleCloseModal();
  };

  if (post) return (
    <form onSubmit={handleSubmit}>
      <h2 className=" flex justify-center text-2xl text-white mb-4">Edit Post</h2>
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">Title</label>
        <input
          type="text"
          value={title || post.Title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-600 border border-gray-500"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">Description</label>
        <textarea
          value={description || post.Description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-gray-600 border border-gray-500"
          rows="4"
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-1">Image Upload</label>
        <input
          type="file"
          onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
          className="w-full p-2 rounded bg-gray-600 border border-gray-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
      >
        Post
      </button>
    </form>
  )

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
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 border border-gray-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 rounded bg-gray-600 border border-gray-500"
              rows="4"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-400 mb-1">Image Upload</label>
            <input
              type="file"
              accept='image/*'
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 rounded bg-gray-600 border border-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Post
          </button>
        </form>
      </PostCreateModel>
    </div>
  );
};

export default PostCreation;
