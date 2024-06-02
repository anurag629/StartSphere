import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";

const Sidebar = ({ articles, onArticleClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredArticles = articles && Array.isArray(articles) ? articles.filter(article =>
    article.title && article.title.toLowerCase().includes(searchTerm.length > 0 ? searchTerm.toLowerCase() : searchTerm)
  ) : [];

  const handleCreateArticle = () => {
    navigate('/create-article');
  };
  console.log("my article:",articles)
  return (
    <aside className="w-1/4  bg-slate-800 p-5 shadow-lg overflow-y-auto no-scrollbar dark:bg-gray-900">
      <div className="flex items-center space-x-4 pb-4">
        <button
          className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center"
          onClick={handleCreateArticle}
        >
          <FaPlus className="mr-2" />
          <span >Create New Article</span>
        </button>
      </div>
      <input
        type="text"
        id="searchBar"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-5 border border-gray-300 rounded"
      />
      <div className="article-menu">
        <ul className="list-none p-0">
          {filteredArticles.map(article => (
            <li
              key={article._id}
              onClick={() => onArticleClick(article)}
              className="p-2 mb-2 bg-slate-700 text-white border border-gray-300 rounded cursor-pointer hover:bg-gray-600"
            >
              {article.title.substring(0,30)}...
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
