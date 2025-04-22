import React, { useState } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { authState } from '../recoil/authAtom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setAuth = useSetRecoilState(authState);

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login',{ email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );
      setAuth({ isLoggedIn: true, user: res.data.user });
      alert('Logged in!');
    }
     catch (err) {
      console.log('Login error:', err.response);  
    if (err.response) {
      const errorMessage = err.response.data.message || 'Login failed: Unknown error';
      alert(errorMessage); 
    } else {
      alert('Login failed: Unknown error');
    }
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/* Email/password login */}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Login
        </button>
      </div>
    </div>
  );
}
