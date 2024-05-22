// src/components/Auth/SignUp.js
import React, { useState } from 'react';
import AuthForm from './AuthForm';

const SignUp = () => {
  const [error, setError] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    // Add signup logic here
    // setError('Sign up failed'); // Example error handling
  };

  return <AuthForm type="signup" onSubmit={handleSignUp} error={error} />;
};

export default SignUp;
