import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const route = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/register`, formData, {withCredentials:true})
        console.log(response.data);
    } catch (error) {
        console.log(error.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Sign Up</h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="your_username"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="Your Full Name"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Create Account
        </button>
      </form>
    </div>
  );
}

export default SignUp;
