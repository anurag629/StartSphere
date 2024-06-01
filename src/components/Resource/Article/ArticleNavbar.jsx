import { Avatar } from 'flowbite-react';
import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
const ArticleNavbar = ({ Author,handleDeleteArticle }) => {
  const navigate= useNavigate();
  return (
    <nav className="bg-gray-800 p-1 flex justify-between items-center text-white">
      {Author ? <div className="profile pr-2 bg-white shadow-md rounded flex items-center">
        <Avatar src={Author.Image} alt={Author.Name} className="w-24 h-24 rounded-full mr-1" />
        <div>
          <div>
            <h2 className="text-medium font-bold text-black">{Author.Name}</h2>
          </div>
          <i className="text-gray-600 text-sm mb-1">{Author.Bio}</i>
          <p className="text-blue-500">{Author.Email}</p>
        </div>
        
      </div>
        : <></>
      }
      <div className="flex items-center space-x-2">
  <FaEdit onClick={()=>navigate('/edit-article')} className="m-2 h-8 w-8 text-white-600 hover:text-blue-500 cursor-pointer transition-colors duration-200 ease-in-out" />
  <MdDelete onClick={handleDeleteArticle} className="m-2 h-8 w-8 text-white-600 hover:text-red-500 cursor-pointer transition-colors duration-200 ease-in-out" />
    </div>
    </nav>
  );
};

export default ArticleNavbar;
