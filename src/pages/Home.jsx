import React, { useEffect } from 'react';
import Navbar from '../components/Home/Navbar';
import ProfileHeader from '../components/Home/ProfileHeader';
import Footer from '../components/Home/Footer';
import PostCreation from '../components/Home/PostCreation';
import PostFeed from '../components/Home/PostFeed';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <ProfileHeader />
          <PostCreation />
          <PostFeed />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
