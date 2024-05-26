import React from 'react';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';
import ProfileCard from '../components/Home/ProfileCard';
import PostCreation from '../components/Home/PostCreation';
import PostFeed from '../components/Home/PostFeed';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <ProfileCard />
          <PostCreation />
          <PostFeed />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
