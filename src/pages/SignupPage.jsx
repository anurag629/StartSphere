import React from 'react';
import SignUp from '../components/Auth/SignUp';
import { useNavigate } from 'react-router-dom';
const SignupPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen flex">
            <div className="w-1/2 bg-gray-900 flex flex-col justify-center items-center p-8">
                <img src='/images/logo2.png' className='w-60 h-60 rounded-md' />
                <h1 className="text-4xl mb-4 text-white mt-5">StartSphere</h1>
                <h2 className="text-2xl mb-8 text-gray-400">Where Startups Take Flight 🚀</h2>
            </div>
            <div className="w-1/2 bg-gray-800 flex justify-center items-center">
                <div className="bg-gray-700 p-8 rounded-lg shadow-lg text-white">
                    <SignUp />
                    <p className="mt-4">
                        Already have an account?
                        <button
                            className="text-blue-500 ml-2 underline"
                            onClick={() => { navigate('/login') }}
                        >
                            Login
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
