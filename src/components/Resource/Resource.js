import React, { useEffect, useState } from 'react';
import Articles from './Article/Articles';
import Sidebar from './Sidebar/Sidebar';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import api from '../../api/axios';
import ArticleHome from './Article/ArticleHome';

const Resource = () => {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await api.get('/article/articles/');
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };
    fetchArticles();
  }, []);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  return (
    <div className="flex w-full flex-col h-screen">
      <Navbar />
      <div className='flex flex-1 w-full'>
        <Sidebar className="w-1/4 h-full overflow-hidden" articles={articles} onArticleClick={handleArticleClick} />
        <div className="w-full h-full overflow-y-auto">
          {selectedArticle ? <Articles article={selectedArticle} setArticle={setSelectedArticle} allArticles={articles} setAllArticles={setArticles}/> : <ArticleHome className="w-1/1"/>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resource;
