import React, { useState } from 'react';
import AuthForm from './AuthForm';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleLogin = async (formData) => {
    const id = toast.loading("Please wait...")
    try {
      const response = await api.post('/user/login', {
        Email: formData.email,
        Password: formData.password,
      });
      if (response) {
        toast.update(id, { render: "Login Successful!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
        console.log("signup/response:: ", response.data)
        localStorage.setItem('user', JSON.stringify(response.data));
        setError('');
        navigate('/');
      }
    } catch (err) {
      setError('Login failed');
      toast.update(id, { render: "Login Failed!", type: "error", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
    }
  };

  return <AuthForm type="login" onSubmit={handleLogin} error={error} />;
};

export default Login;
