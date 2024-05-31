import React from 'react';
import './Style/Articles.css';
import ArticleNavbar from './ArticleNavbar';
const Articles = ({ article }) => {
  return (

    <div className="content">
      <ArticleNavbar Author={article ? article.author : null} />
      {article ? (
        <div>
          <h2 className="article-title">{article.title}</h2>
          {article.content.map((block, index) => {
            if (block.type === 'text') {
              return <p key={index} style={{ marginTop: '4px' }}  >{block.value}</p>;
            } else if (block.type === 'image') {
              return <img key={index} style={{ height: '300px', margin: 'auto', marginTop: '6px' }} src={block.value} alt="" />;
            } else if (block.type === 'video') {
              return <video key={index} style={{ height: '300px', margin: 'auto', marginTop: '6px' }} src={block.value} controls />;
            } else if (block.type === 'heading') {
              return <h4 className="article-subheading" style={{ marginTop: '4px' }} key={index}>{block.value}</h4>;
            }
            else if (block.type === 'subHeading') {
              return <h4 className="article-subheading" style={{ marginTop: '4px' }} key={index}>{block.value}</h4>;
            }
            else if (block.type === 'List') {
              return <li style={{ marginTop: '4px', marginLeft: '20px' }} key={index}>{block.value}</li>;
            }
            else {
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
