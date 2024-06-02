import React, { useState } from 'react';
import AuthForm from './AuthForm';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSignUp = async (formData) => {
    const id = toast.loading("Please wait...")
    try {
      const response = await api.post('/user/signup', {
        Name: formData.name,
        Email: formData.email,
        Password: formData.password,
        ConfirmPassword: formData.password,
      });
      if (response) {
        toast.update(id, { render: "Signup Successful!", type: "success", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
        console.log("signup/response:: ", response.data)
        localStorage.setItem('user', JSON.stringify(response.data));
        setError('');
        navigate('/');
      }
    } catch (err) {
      setError('Sign up failed');
      toast.update(id, { render: "Signup Failed!", type: "error", isLoading: false, autoClose: 2000, closeOnClick: true, pauseOnHover: true, closeButton: true });
    }
  };

  return <AuthForm type="signup" onSubmit={handleSignUp} error={error} />;
};

export default SignUp;
