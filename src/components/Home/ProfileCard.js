import React, { useEffect, useState } from 'react';
// import api from '../../api/axios';

const ProfileCard = () => {
  // const [users, setUsers] = useState([]);
  // const [error, setError] = useState('');

  const userDetails = localStorage.getItem('user');
  // console.log(userDetails);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const user = JSON.parse(localStorage.getItem('user'));
  //       if (user && user.token) {
  //         const response = await api.get('/user/alluser', {
  //           headers: {
  //             Authorization: `Bearer ${user.token}`,
  //           },
  //         });
  //         setUsers(response.data);
  //       }
  //     } catch (err) {
  //       setError('Failed to fetch users');
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  return (
    <div className="bg-gray-700 p-4 rounded-lg text-white mb-4">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-gray-600"></div>
        <div>
          <h2 className="text-xl font-bold">
            Welcome {userDetails ? JSON.parse(userDetails).Name : ''}
          </h2>
          {/* <div>
            {error && <p className="text-red-500">{error}</p>}
            <ul>
              {users.map((user) => (
                <li key={user._id}>{user.Name} - {user.Email}</li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
