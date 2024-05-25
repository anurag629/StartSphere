import React, { useState } from 'react';
import AuthForm from './AuthForm';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (formData) => {
    try {
      const response = await api.post('/user/login', {
        Email: formData.email,
        Password: formData.password,
      });
      if (response) {
        console.log("signup/response:: ", response.data)
        localStorage.setItem('user', JSON.stringify(response.data));
        setError('');
        navigate('/');
      }

    } catch (err) {
      setError('Login failed');
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} error={error} />;
};

export default Login;
