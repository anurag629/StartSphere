import React, { useEffect } from 'react';
import RoutesConfig from './routes';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './feature/authSlice';
import { setProfile } from './feature/profileSlice';
import api from './api/axios';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData) || null;

  // UserData
  useEffect(() => {
    const checkUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user')) || null;
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

  return (
    <div className="App">
      <ToastContainer />
      <RoutesConfig />
    </div>
  );
};

export default App;