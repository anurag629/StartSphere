import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import SignUp from '../components/Auth/SignUp';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 bg-gray-900 flex flex-col justify-center items-center p-8">
        <h1 className="text-4xl mb-4 text-white">StartSphere</h1>
        <h2 className="text-2xl mb-8 text-gray-400">Where Startups Take Flight 🚀</h2>
        {/* Add an image here */}
        <p className="text-white mt-4">Image ?</p>
      </div>
      <div className="w-1/2 bg-gray-800 flex justify-center items-center">
        <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-white">
          {isLogin ? <Login /> : <SignUp />}
          <p className="mt-4">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button 
              className="text-blue-500 ml-2 underline"
              onClick={toggleAuthForm}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
