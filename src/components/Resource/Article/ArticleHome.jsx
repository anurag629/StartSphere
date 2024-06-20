import React from 'react';
import { useNavigate } from 'react-router-dom';

const ArticleHome = () => {
  const navigate = useNavigate();

  return (
    <div className=" h-screen relative min-h-screen bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: 'url(https://techcrunch.com/wp-content/uploads/2023/03/GettyImages-1180708314.jpg)' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-center p-8 max-w-lg mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Welcome to Article Explorer</h1>
        {/* <p className="text-lg md:text-xl mb-6">“The purpose of art is washing the dust of daily life off our souls.” – Pablo Picasso</p> */}
        <button 
          onClick={() => navigate('/create-article')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300"
        >
          Create New Article
        </button>
      </div>
    </div>
  );
};

export default ArticleHome;
