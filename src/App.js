import React, { useEffect } from 'react';
import RoutesConfig from './routes';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './feature/authSlice';
import { setProfile } from './feature/profileSlice';
import api from './api/axios';
import ChatButton from './components/Chat/ChatButton';
import ChatDrawer from './components/Chat/ChatDrawer';
import { addSocket, setIsChatOpen } from './feature/socketSlice';
import io from 'socket.io-client';
const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.userData) || null;
  const profile = useSelector(state => state.profile.profile) || null;
  // const [isChatOpen, setIsChatOpen] = React.useState(false);
  const isChatOpen = useSelector(state=>state.chat.isChatOpen) || false;
  localStorage.setItem('flowbite-theme-mode', 'dark');

  // UserData
  useEffect(() => {
    const newSocket = io('wss://yourstorybackend.onrender.com');
    const checkUserData = () => {
      try {
        const userData = JSON.parse(localStorage.getItem('user')) || null;
        if (userData) {
          dispatch(login({ userData }));
          dispatch(addSocket(newSocket));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("App.jsx/userData::", error);
      }
    };

    if (!user) {
      checkUserData();
      console.log("App:: User fetched")
    }
    return () => newSocket.close();
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

    if (user && !profile) {
      getProfile();
      console.log("App:: Profile fetched")
    }
  }, [user, dispatch]);

  const toggleChat = () => {
    console.log("click",setIsChatOpen)
    dispatch(setIsChatOpen(!isChatOpen))
  };


  return (
    <div className="App">
      <ToastContainer />
      <RoutesConfig />
      {user && <ChatButton onClick={toggleChat} />}
      {user && <ChatDrawer isOpen={isChatOpen} onClose={toggleChat} />}
    </div>
  );
};

export default App;