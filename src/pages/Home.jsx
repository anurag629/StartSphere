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
import { addSocket } from '../feature/socketSlice';
import io from 'socket.io-client';

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

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData) || null;
  const posts = useSelector(state => state.posts.posts);
  const profile = useSelector(state => state.profile.profile) || null;

  // UserData
  useEffect(() => {
    const newSocket = io('wss://yourstorybackend.onrender.com');
    const checkUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          dispatch(login({ userData }));
          dispatch(addSocket(newSocket));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Home.jsx/userData::", error);
      }
    };

    if (!user) {
      checkUserData();
      console.log("Home:: User fetched")
    }
    return () => newSocket.close();
  }, [dispatch]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (!user || !user.Token) {
        return;
      }

      try {
        const fetchedPosts = await fetchAllPosts(user.Token);
        fetchedPosts.forEach(post => dispatch(addPost(post)));
      } catch (error) {
        console.error("Home.jsx/fetchPosts::", error);
      }
    };

    if (user && posts.length === 0) {
      fetchPosts();
      console.log("Home:: Posts fetched")
    }
  }, [dispatch, posts.length]);
  // }, [user, dispatch, posts.length]);

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
        console.error("Home.jsx/getProfile::", error);
      }
    };

    if (!profile) {
      getProfile();
      console.log("Home:: Profile fetched")
    }
  }, [user, dispatch]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow p-4 bg-slate-900">
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
