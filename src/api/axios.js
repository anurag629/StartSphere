import axios from 'axios';

const api = axios.create({
  baseURL: 'https://yourstorybackend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('userToken');
      window.location.replace('/');
    }
    return Promise.reject(error);
  }
);

export default api;
