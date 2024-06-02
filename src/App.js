import React, { useEffect } from 'react';
import RoutesConfig from './routes';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './feature/authSlice';

const App = () => {
  const dispatch = useDispatch();

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

  return (
    <div className="App">
      <ToastContainer />
      <RoutesConfig />
    </div>
  );
};

export default App;