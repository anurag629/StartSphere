import React, { useEffect, useState } from 'react';
import Articles from './Article/Articles';
import Sidebar from './Sidebar/Sidebar';
import Navbar from '../Home/Navbar';
import Footer from '../Home/Footer';
import api from '../../api/axios';
import ArticleHome from './Article/ArticleHome';
import SkeletonSidebar from './Sidebar/SkeletonSidebar';
import { useDispatch, useSelector } from 'react-redux';
import { addArticle } from '../../feature/articleSlice';

const fetchAllArticles = async () => {
  try {
    const response = await api.get('/article/articles/');
    if (response?.data?.articles) {
      return response?.data?.articles;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

const Resource = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const articles = useSelector(state => state.articles.articles) || [];
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(articles ? false : true);
  //   const fetchArticles = async () => {
  //     try {
  //       const response = await api.get('/article/articles/');
  //       setArticles(response.data.articles);
  //     } catch (error) {
  //       console.error("Error fetching articles:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchArticles();
  // }, []);
  
  useEffect(() => {
    const fetchArticles = async () => {

      if (articles.length === 0) {
        try {
          const fetchedArticles = await fetchAllArticles();
          fetchedArticles.map(article => dispatch(addArticle(article)));
        } catch (error) {
          console.error("App.jsx/fetchAllArticles::", error);
        }
        finally {
          setLoading(false);
        }
      }
    };

    fetchArticles();
  }, [dispatch, articles.length]);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  return (
    <div className="flex w-full flex-col h-screen">
      <Navbar />
      <div className='flex flex-1 w-full '>
        {loading ? (<SkeletonSidebar />) : (
          <Sidebar className="w-1/4 overflow-hidden" articles={articles} onArticleClick={handleArticleClick} />)}
        <div className="w-full overflow-y-auto bg-rounded-md">
          {selectedArticle ? <Articles article={selectedArticle} setArticle={setSelectedArticle} /> : <ArticleHome className="w-1/1" />}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resource;
