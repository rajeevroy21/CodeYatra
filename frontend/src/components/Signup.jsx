import React, { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        email,
        password,
      });
      alert('User created!');
    } catch (err) {
      console.log(err);
      alert('Signup failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Signup</h2>
        <input
          value={name}
          onChange={(e) => setname(e.target.value)}
          placeholder="name"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSignup}
          className="w-full bg-green-600 cursor-pointer text-white p-3 rounded-lg hover:bg-green-700 transition"
        >
          Signup
        </button>
      </div>
    </div>
  );
}
