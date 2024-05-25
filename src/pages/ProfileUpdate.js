import React from 'react';
import UpdateProfile from '../components/Profile/UpdateProfile';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/Home/Footer';

const ProfileUpdate = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <UpdateProfile />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfileUpdate;
