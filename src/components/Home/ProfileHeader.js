import React from 'react';

const ProfileHeader = () => {
  const userDetails = localStorage.getItem('user');

  return (
    <div className="bg-gray-700 p-4 rounded-lg text-white mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-600"></div>
        <div>
          <h2 className="text-xl font-bold">
            Welcome {userDetails ? JSON.parse(userDetails).Name : ''}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
