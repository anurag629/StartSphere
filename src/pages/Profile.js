// src/pages/ProfilePage.jsx
import React from 'react';
import ProfileCard from '../components/Profile/ProfileCard';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <ProfileCard />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
