import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/authAtom';
import { themeState } from '../recoil/themeAtom';

const Setting = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');
  const userId = useRecoilValue(authState)?.user?._id;
  const theme = useRecoilValue(themeState);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFields = {};
    Object.keys(form).forEach((key) => {
      if (form[key].trim() !== '') {
        updatedFields[key] = form[key];
      }
    });

    if (Object.keys(updatedFields).length === 0) {
      setMessage("Please enter at least one field to update.");
      return;
    }

    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/update-profile/${userId}`,
        updatedFields
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating profile');
    }
  };

  return (
   <div className={`pt-30 min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
          <div className={`max-w-xl mx-auto p-4 bg-white shadow rounded-lg ${theme === 'dark' ? 'dark:bg-gray-800' : 'dark:bg-gray-100'}`}>
          <h2 className={`text-3xl font-semibold text-center mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Update Profile </h2>
      {message && (
        <div className={`mb-4 text-center ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          className={`border px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'}`}
        />

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          className={`border px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'}`}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter new password"
          value={form.password}
          onChange={handleChange}
          className={`border px-4 py-2 rounded-md ${theme === 'dark' ? 'bg-gray-800 text-white border-gray-600 placeholder-gray-400' : 'bg-white text-gray-900 border-gray-300 placeholder-gray-500'}`}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
        >
          Update Profile
        </button>
      </form>
    </div>
    </div>
  );
};

export default Setting;
