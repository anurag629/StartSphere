import React, { useState } from 'react';
import './Style/Sidebar.css';
import { useNavigate } from 'react-router-dom';
import { FaPlus } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';

const Sidebar = ({ articles, onArticleClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredArticles = articles && Array.isArray(articles) ? articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <aside className="sidebar">
      <div className="flex items-center space-x-4 pb-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate('/create-article')}>
          <div className='flex justify-center items-center'>
            <FaPlus /><span>Create New Article</span>
          </div>
        </button>
        <FaEdit />
        <MdDelete />
      </div>
      <input
        type="text"
        id="searchBar"
        placeholder="Search articles..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className='article-menu'>
        <ul id="articleList">
          {filteredArticles.map(article => (
            <li key={article.id} onClick={() => onArticleClick(article)}>
              {article.title}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
