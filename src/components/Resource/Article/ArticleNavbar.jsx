import { Avatar } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axios';

const ArticleNavbar = ({ Author,article, handleDeleteArticle }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [profile,setProfile]= useState(null);
  useEffect(() => {
    const fetchProfile = async () => {
        try {
                const profileResponse = await api.get(`/profile/${userData._id}`, {
                    headers: {
                        Authorization: `Bearer ${userData.Token}`,
                    },
                  })
                 setProfile(profileResponse.data);
            }
        catch (err) {
            console.error(err);
        }
    };

    fetchProfile();
}, []);
console.log("profile:",profile);
console.log("author: ",Author)
  return (
    <nav className="rounded-md p-1 flex justify-between items-center text-white">
      {Author ? (
        <div className="max-w-xs profile pr-2 text-white shadow-md rounded flex items-center">
          <img src={Author.Image} alt={Author.Name} className="w-20 h-20 rounded-full mr-2" />
          <div className="max-w-xs text-white">
            <h2 className="text-medium font-bold text-white">{Author.Name}</h2>
            <p className="text-white text-sm mb-1 break-all overflow-hidden whitespace-pre-wrap">
              {Author.Bio}
            </p>
            <p className="text-blue-500">{Author.Email}</p>
          </div>
        </div>
      ) : null}
      <div className="flex items-center space-x-2">
        {profile && profile._id===Author._id && <FaEdit 
          onClick={() => navigate(`/edit-article/${article._id}`)} 
          className="m-2 h-8 w-8 text-white-600 hover:text-blue-500 cursor-pointer transition-colors duration-200 ease-in-out" 
        />}
         {profile && profile._id===Author._id &&<MdDelete 
          onClick={handleDeleteArticle} 
          className="m-2 h-8 w-8 text-white-600 hover:text-red-500 cursor-pointer transition-colors duration-200 ease-in-out"
        />}
      </div>
    </nav>
  );
};

export default ArticleNavbar;
