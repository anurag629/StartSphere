// src/components/Home/PostFeed.js
import React from 'react';
import PostCard from './Post/PostCard';
import { useContext } from 'react';
import { PostContext } from '../../context/PostContext';

const PostFeed = () => {
  const { posts } = useContext(PostContext);

  return (
    <div>
      {posts.map((post, index) => (
        <PostCard 
          key={index} 
          title={post.title} 
          description={post.description} 
          image={post.image} 
          likes={post.likes} 
          comments={post.comments} 
          shares={post.shares} 
        />
      ))}
    </div>
  );
};

export default PostFeed;
