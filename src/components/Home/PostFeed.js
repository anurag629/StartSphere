// src/components/Home/PostFeed.js
import React, { useMemo, useState } from 'react';
import PostCard from './Post/PostCard';
import { useSelector } from 'react-redux';


const PostFeed = () => {
  const allPosts = useSelector((state) => state.posts.posts)
  const [posts, setPosts] = useState([])
  // console.log("allPosts: ", allPosts);

  useMemo(() => {
    if (allPosts) {
      setPosts(allPosts)
    }
  }, [allPosts])

  if (posts?.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <div className="flex flex-wrap">
          <div className="p-2 w-full"> 
            <h1 className="text-2xl font-bold hover:text-gray-500 text-white">
              Loading Posts...
            </h1>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard 
          key={post._id} 
          post={post}
        />
      ))}
    </div>
  );
};

export default PostFeed;
