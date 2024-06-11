import React from 'react';
import ArticleNavbar from './ArticleNavbar';
import api from '../../../api/axios';
import { useDispatch, useSelector } from 'react-redux';
import { deleteArticle } from '../../../feature/articleSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Articles = ({ article, setArticle}) => {

  const userData = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  
  const handleDeleteArticle = async () => {
    const id = toast.loading("Please wait...")
    try {
      await api.delete(`/article/articles/${article._id}`, {
        headers: {
          'Authorization': `Bearer ${userData.Token}`,
        },
      })
      toast.update(id, { render: "Article deleted successfully!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
      dispatch(deleteArticle(article._id))
      setArticle(null)
    } catch (error) {
      toast.update(id, { render: "Error in deleting article!", type: "error", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
      console.error(error)
    }
  }

  return (
    <div className="h-full flex-grow p-10 bg-slate-900 text-white overflow-y-auto no-scrollbar">
      <ArticleNavbar Author={article ? article.author : null} article={article} handleDeleteArticle={handleDeleteArticle} />
      <hr />
      {article ? (
        <div className="content ">
          <h2 className="font-semibold text-2xl mb-4 mt-5">{article.title}</h2>
          {article.content.map((block, index) => {
            if (block.type === 'text') {
              return <p key={index} className="mb-4">{block.value}</p>;
            } else if (block.type === 'image') {
              return <img key={index} className="h-auto w-1/2 mb-6 m-auto" src={block.value} alt="" />;
            } else if (block.type === 'video') {
              return <video key={index} className="h-auto w-1/2 mb-6 m-auto" src={block.value} controls />;
            }
            else if (block.type === 'heading') {
              return <h2 key={index} className="text-xl font-bold mb-4">{block.value}</h2>;
            } else if (block.type === 'subheading') {
              return <h4 key={index} className="font-semibold mb-4">{block.value}</h4>;
            } else if (block.type === 'list') {
              return <ul key={index} className="list-disc list-inside mb-4">{block.value.split(',').map((item, i) => <li key={i}>{item}</li>)}</ul>;
            } else {
              return null;
            }
          })}
        </div>
      ) : (
        <p>Select an article to read</p>
      )}
    </div>
  );
};

export default Articles;
