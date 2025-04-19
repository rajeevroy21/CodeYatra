 import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { authState } from '../recoil/authAtom';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { themeState } from '../recoil/themeAtom';

const Navbar = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [theme, setTheme] = useRecoilState(themeState);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      setAuth({ isLoggedIn: false, user: null });
      setVisible(false);
      navigate('/upcoming');
    } catch (err) {
      console.error(err);
      alert("Logout failed");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };
  return (
    <nav className={` ${theme === 'dark' ? 'dark:bg-gray-800' : 'bg-white'} fixed w-full z-50 shadow`}>

      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 ">
          <img src="/images/logo.png" className="h-8" alt="Logo" />
          <span className={`text-2xl font-semibold ${theme === 'dark' ? 'dark:text-white' : 'text-gray-900'}`}>CodeYatra</span>

        </div>

        <div className="flex items-center md:order-2 space-x-3">
          {auth.user ? (
            <>
              <button
                type="button"
                className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                onClick={() => setVisible(!visible)}
                aria-expanded={visible}
              >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-medium cursor-pointer">
                  
                  {auth?.user?.name?.charAt(0).toUpperCase()}
                </div>
              </button>

              <div className={`${visible ? 'block' : 'hidden'} fixed top-14  z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow ${theme==='dark'?'dark:bg-gray-700':'dark:bg-white'}  dark:divide-gray-600`}>
                <div className="px-1 py-3 text-center ">

                  <span className={`block text-md text-gray-900 ${theme==='dark'?'dark:text-white':'dark:text-black'}  text-center`}>{auth.user.name}</span>

                  <span className={`block text-md text-gray-900 m ${theme==='dark'?'dark:text-white':'dark:text-black'}  text-center`}>{auth.user.email}</span>
                </div>
                <ul className="py-2">
                  <li>
                    <Link to="/dashboard" className={`block px-2 py-2 text-sm 
                      ${theme==='dark'?'dark:text-white':'dark:text-black'} hover:text-blue-600 text-center`}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/setting" className={`block px-2 py-2 text-sm 
                      ${theme==='dark'?'dark:text-white':'dark:text-black'} hover:text-blue-600 text-center`}>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleSignOut} className="block w-full  px-9 py-2 text-sm text-red-600 dark:text-red-400 hover:text-red-500 font-bold  text-center cursor-pointer">
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <Link to="/login" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-700"
            >

              Sign up / Log in
            </Link>
          )}

          <button
            onClick={toggleTheme}
            className="ml-4 text-xl p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
            title="Toggle Theme"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium p-4 md:p-0 mt-4 md:mt-0 border md:border-0 rounded-lg">

            <li><Link to="/home" className={`block py-2 px-3 text-red-900 rounded-sm hover:bg-gray-100  md:hover:text-blue-700 md:p-0 ${theme==='dark'?'dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700':'dark:text-gray-900 md:dark:hover:text-blue-700 font-medium  dark:hover:bg-gray-700'}
                dark:hover:text-white md:dark:hover:bg-transparent`}>Home</Link></li>


            <li><Link to="/upcoming" className={`block py-2 px-3 text-red-900 rounded-sm hover:bg-gray-100  md:hover:text-blue-700 md:p-0 ${theme==='dark'?'dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700':'dark:text-gray-900 md:dark:hover:text-blue-700 font-medium  dark:hover:bg-gray-700'}
                dark:hover:text-white md:dark:hover:bg-transparent`}>Upcoming Contest</Link></li>

            <li><Link to="/addprofile" className={`block py-2 px-3 text-red-900 rounded-sm hover:bg-gray-100  md:hover:text-blue-700 md:p-0 ${theme==='dark'?'dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700':'dark:text-gray-900 md:dark:hover:text-blue-700 font-medium  dark:hover:bg-gray-700'}
                dark:hover:text-white md:dark:hover:bg-transparent`}>Add Profile</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
