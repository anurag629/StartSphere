import React, { useEffect, useState } from 'react';
import Navbar from '../components/Home/Navbar';
import ProfileHeader from '../components/Home/ProfileHeader';
import Footer from '../components/Home/Footer';
import PostCreation from '../components/Home/PostCreation';
import PostFeed from '../components/Home/PostFeed';
import { useDispatch, useSelector } from 'react-redux';
import api from '../api/axios';
import { login, logout } from '../feature/authSlice';
import { addPost } from '../feature/postSlice'; 
import { setProfile } from '../feature/profileSlice';
// import { addArticle } from '../feature/articleSlice';

const fetchAllPosts = async (token) => {
  try {
    const response = await api.get(`post/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (response && response.data) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

// const fetchAllDummyArticles = async () => {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   return [];
// }

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData) || null;
  const posts = useSelector(state => state.posts.posts);
  const articles = useSelector(state => state.articles.articles);

  // UserData
  useEffect(() => {
    const checkUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("App.jsx/userData::", error);
      }
    };

    checkUserData();
  }, [dispatch]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (!user || !user.Token) {
        return;
      }

      if (posts.length === 0) {
        try {
          const fetchedPosts = await fetchAllPosts(user.Token);
          fetchedPosts.forEach(post => dispatch(addPost(post)));
        } catch (error) {
          console.error("App.jsx/fetchPosts::", error);
        }
      }
    };

    fetchPosts();
  }, [user, dispatch, posts.length]);

  // Fetch profile
  useEffect(() => {
    const getProfile = async () => {
      if (!user || !user._id || !user.Token) {
        return;
      }

      try {
        const response = await api.get(`/profile/${user._id}`, {
          headers: {
            Authorization: `Bearer ${user.Token}`
          }
        });
        if (response) {
          dispatch(setProfile(response.data));
        }
      } catch (error) {
        console.error("App.jsx/getProfile::", error);
      }
    };

    getProfile();
  }, [user, dispatch]);

  // Fetch articles
  // useEffect(() => {
  //   const fetchArticles = async () => {
  //     if (!user || !user.Token) {
  //       return;
  //     }

  //     if (articles.length === 0) {
  //       try {
  //         const fetchedArticles = await fetchAllDummyArticles();
  //         fetchedArticles.forEach(article => dispatch(addArticle(article)));
  //       } catch (error) {
  //         console.error("App.jsx/fetchArticles::", error);
  //       }
  //     }
  //   };

  //   fetchArticles();
  // }, [user, dispatch, articles.length]);

  // // Fetch articles
  // useEffect(() => {
  //   const fetchArticles = async () => {

  //     if (articles.length === 0) {
  //       try {
  //         const fetchedArticles = await fetchAllArticles();
  //         fetchedArticles.forEach(article => dispatch(addArticle(article)));
  //       } catch (error) {
  //         console.error("App.jsx/fetchAllArticles::", error);
  //       }
  //       finally {
  //         setLoading(false);
  //       }
  //     }
  //   };

  //   fetchArticles();
  // }, [dispatch, articles.length]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <ProfileHeader />
          <PostCreation />
          <PostFeed />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
