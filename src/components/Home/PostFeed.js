// src/components/Home/PostFeed.js
import React from 'react';
import PostCard from './Post/PostCard';

const PostFeed = () => {
  // Example posts data
  const posts = [
    {
      title: 'Post 1',
      description: 'This is the description for post 1.',
      image: 'https://via.placeholder.com/400',
      likes: 10,
      comments: 5,
      shares: 2
    },
    {
      title: 'Post 2',
      description: 'This is the description for post 2.',
      image: 'https://via.placeholder.com/400',
      likes: 20,
      comments: 10,
      shares: 4
    }
  ];

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
