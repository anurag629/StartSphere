import React, { useState } from 'react';
import AuthForm from './AuthForm';
import api from '../../api/axios';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate()

  const handleSignUp = async (formData) => {
    try {
      const response = await api.post('/user/signup', {
        Name: formData.name,
        Email: formData.email,
        Password: formData.password,
        ConfirmPassword: formData.password,
      });
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log("signup/response:: ", response.data)
      setError('');
      navigate('/home');

    } catch (err) {
      setError('Sign up failed');
    }
  };

  return <AuthForm type="signup" onSubmit={handleSignUp} error={error} />;
};

export default SignUp;
