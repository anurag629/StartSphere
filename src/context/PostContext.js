import React, { createContext, useState } from 'react';

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    {
      title: 'Connectify - Empowering Professional Connections',
      description: 'Connectify is a cutting-edge social networking platform designed to enhance professional connections and foster meaningful collaborations. With seamless integration of advanced AI-powered tools, Connectify offers personalized networking experiences, real-time collaboration features, and insightful analytics to help professionals and businesses thrive in the digital age. Join Connectify to expand your network, collaborate on projects, and unlock new opportunities for growth.',
      image: 'https://troposlab.com/wp-content/uploads/2019/03/STARTUP-blog-bizcool.jpg',
      likes: 10,
      comments: 5,
      shares: 2
    },
    {
      title: 'SynergyHub - Revolutionizes Professional Networking',
      description: 'SynergyHub revolutionizes professional networking by connecting innovators and industry leaders. With AI-driven insights and collaboration tools, it empowers users to build impactful relationships and drive their careers forward.',
      image: 'https://img.jagranjosh.com/images/2022/August/1082022/what-is-a-start-up-types-funding-compressed.webp',
      likes: 20,
      comments: 10,
      shares: 4
    }
  ]);

  const addPost = (post) => {
    setPosts([...posts, post]);
  };

  const updatePost = (updatedPost) => {
    setPosts(posts.map(post => post.id === updatedPost.id ? updatedPost : post));
  };

  const deletePost = (postId) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  return (
    <PostContext.Provider value={{ posts, addPost, updatePost, deletePost }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostProvider, PostContext };
