import React, { useEffect, useState } from 'react';
import './Style/Resource.css';
import Articles from './Articles';
import Sidebar from './Sidebar';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import CreateArticleForm from './CreateArticleForm';
import { useSelector } from 'react-redux';

const Resource = () => {
  const allArticles = useSelector((state) => state.articles.articles);
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    setArticles(allArticles);
  }, [allArticles]);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const addNewArticle = (newArticle) => {
    setArticles([...articles, newArticle]);
  };

  console.log("ARRrticles:: ", articles)

  return (
    <div width="100%" style={{ height: "100vh" }}>
      <Navbar />
      <div className='Resource'>
        <div className='container'>
          <Sidebar articles={articles} onArticleClick={handleArticleClick} />
          <Articles article={selectedArticle} />
        </div>
      </div>
    </div>
  );
};

export default Resource;
