import React, { useState } from 'react';

const AuthForm = ({ type, onSubmit, error }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {type === 'signup' && (
        <div>
          <label className="block text-sm">Name</label>
          <input
            type="text"
            name="name"
            className="w-full p-2 rounded bg-gray-600 border border-gray-500"
            required
            onChange={handleChange}
          />
        </div>
      )}
      <div>
        <label className="block text-sm">Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-2 rounded bg-gray-600 border border-gray-500"
          required
          onChange={handleChange}
        />
      </div>
      <div>
        <label className="block text-sm">Password</label>
        <input
          type="password"
          name="password"
          className="w-full p-2 rounded bg-gray-600 border border-gray-500"
          required
          onChange={handleChange}
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-lg">
        {type === 'signup' ? 'Sign Up' : 'Login'}
      </button>
    </form>
  );
};

export default AuthForm;
