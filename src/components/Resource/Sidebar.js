import React, { useState } from 'react';
import './Style/Sidebar.css';

const Sidebar = ({ articles, onArticleClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="sidebar">
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
