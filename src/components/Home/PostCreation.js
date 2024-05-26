import React, { useState } from 'react';
import PostCreateModel from './Post/PostCreateModel';
import { useDispatch, useSelector } from 'react-redux';
import { addPost, updatePost } from '../../feature/postSlice';
import { useNavigate } from 'react-router-dom';

const PostCreation = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTitle('');
    setDescription('');
    setImage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (post) {
      // Update Post
      console.log("Update Post")
      const updatedPost = {
        postId: post.postId,
        title: title || post.title,
        userName: post.userName,
        description: description || post.description,
        imageUrl: post.imageUrl,
        userId: post.userId,
        createdAt: post.createdAt,
        updatedAt: '2024-05-27',
        likes: post.likes,
        comments: post.comments,
        shares: post.shares
      }
      dispatch(updatePost(updatedPost))
      navigate(`/post/${updatedPost.postId}`)
    }
    else {
      // Create Post
      console.log("Create Post")
      // api call
      const newPost = {
        postId: Date.now().toString(),
        title: title,
        userName: userData.Name,
        description: description,
        imageUrl: 'https://media.sproutsocial.com/uploads/2017/01/Instagram-Post-Ideas.png',
        userId: userData._id,
        createdAt: '2021-09-01',
        updatedAt: '2021-09-01',
        likes: '0',
        comments: '0',
        shares: '0'
      }
      dispatch(addPost(newPost))
      navigate(`/post/${newPost.postId}`)
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
            value={title || post.title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-600 border border-gray-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-1">Description</label>
          <textarea
            value={description || post.description}
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
      </PostCreateModel>
    </div>
  );
};

export default PostCreation;
