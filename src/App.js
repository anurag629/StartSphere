import React from 'react';
import RoutesConfig from './routes';
import api from './api/axios';
import { useEffect } from 'react';

const App = () => {

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      api.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
    }
  }, []);

  return (
    <div className="App">
      <RoutesConfig />
    </div>
  );
};

export default App;
