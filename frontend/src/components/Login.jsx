import React, { useState } from 'react';
import axios from 'axios';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { authState } from '../recoil/authAtom';
import { themeState } from '../recoil/themeAtom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to control loading spinner
  const setAuth = useSetRecoilState(authState);
  const navigate = useNavigate();
  const theme = useRecoilValue(themeState);

  // Handle signup form submission
  const handleSignup = async () => {
    try {
      await axios.post('https://codeyatra.onrender.com/api/auth/signup', { name, email, password });
      alert('User created!');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert('Signup failed');
      }
    }
  };

  // Handle login form submission
  const handleLogin = async () => {
    setLoading(true); 
    try {
      const res = await axios.post('https://codeyatra.onrender.com/api/auth/login', { email, password }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      setAuth({ isLoggedIn: true, user: res.data.user });
      alert('Logged in!');
      navigate('/home');
    } catch (err) {
      console.log('Login error:', err.response);
      const errorMessage = err.response ? err.response.data.message : 'Login failed: Unknown error';
      alert(errorMessage);
    } finally {
      setLoading(false); // Stop loading when the request finishes
    }
  };

  return (
    <div className={`flex items-center justify-center min-h-screen ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-black'}`}>
      <div className={`p-8 rounded-2xl shadow-lg w-full max-w-sm ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <h2 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Signup'}</h2>

        {!isLogin && (
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className={`w-full p-3 border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className={`w-full p-3 border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className={`w-full p-3 border ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'} rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        />

        <button
          onClick={isLogin ? handleLogin : handleSignup}
          className={`w-full ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-600'} text-white p-3 rounded-lg hover:bg-blue-700 transition cursor-pointer`}
        >
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="w-4 h-4 border-2 border-t-2 border-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : (
            isLogin ? 'Login' : 'Signup'
          )}
        </button>

        <p className="mt-4 text-center">
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 cursor-pointer"
          >
            {isLogin ? ' Sign up' : ' Login'}
          </span>
        </p>
      </div>
    </div>
  );
}
