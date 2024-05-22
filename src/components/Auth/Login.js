// src/components/Auth/Login.js
import React, { useState } from 'react';
import AuthForm from './AuthForm';

const Login = () => {
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Add login logic here
    // setError('Login failed'); // Example error handling
  };

  return <AuthForm type="login" onSubmit={handleLogin} error={error} />;
};

export default Login;
