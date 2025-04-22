import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/authAtom';
import { themeState } from '../recoil/themeAtom';  

const Addprofile = () => {
  const [usernames, setUsernames] = useState({
    leetcode: '',
    codeforces: '',
    codechef: '',
  });
  const userId = useRecoilValue(authState)?.user?._id;
  const theme = useRecoilValue(themeState); 

  const [message, setMessage] = useState('');
  console.log(userId);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsernames((prev) => ({ ...prev, [name]: value }));
  };

  const handleSingleSubmit = async (platform) => {
    setMessage('');
    const username = usernames[platform];
  
    try {
      const res = await axios.post(`http://localhost:5000/api/add-profile`, {
        userId,
        [platform]: username,
      });
      console.log("response", res.data);
  
      if (res.status === 201) {
        const savedUsername = res.data.saved[platform];
        if (savedUsername) {
          setMessage(`${platform} username saved successfully.`);
          setUsernames((prev) => ({ ...prev, [platform]: '' }));
        } else {
          setMessage(`${platform} username not valid and not saved.`);
        }
      } else {
        setMessage(res.data.message || `Failed to save ${platform} username.`);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || `Error saving ${platform} username.`);
    }
  };

  return (
     <div className={`pt-30 min-h-screen ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
          <div className={` max-w-xl mx-auto p-4 bg-white shadow rounded-lg ${theme === 'dark' ? 'dark:bg-gray-800' : ''}`}>
      <h2 className={`text-2xl font-semibold text-center mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>Add Coding Profiles</h2>

      {message && <p className="text-center mb-4 text-sm text-blue-600">{message}</p>}

      <div className="flex flex-col gap-4 ">
        {/* LeetCode */}
        <div className="flex gap-2">
          <input
            type="text"
            name="leetcode"
            value={usernames.leetcode}
            onChange={handleChange}
            placeholder="LeetCode Username"
            className={`border p-2 rounded flex-grow ${theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-900'}`}
            required
          />
          <button
            onClick={() => handleSingleSubmit('leetcode')}
            className="bg-blue-600 cursor-pointer text-white px-4 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        </div>

        {/* Codeforces */}
        <div className="flex gap-2">
          <input
            type="text"
            name="codeforces"
            value={usernames.codeforces}
            onChange={handleChange}
            placeholder="Codeforces Username"
            className={`border p-2 rounded flex-grow ${theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-900'}`}
            required
          />
          <button
            onClick={() => handleSingleSubmit('codeforces')}
            className="bg-green-600 text-white px-4 rounded hover:bg-green-700 transition cursor-pointer"
          >
            Submit
          </button>
        </div>

        {/* CodeChef */}
        <div className="flex gap-2">
          <input
            type="text"
            name="codechef"
            value={usernames.codechef}
            onChange={handleChange}
            placeholder="CodeChef Username"
            className={`border p-2 rounded flex-grow ${theme === 'dark' ? 'bg-gray-700 text-white' : 'text-gray-900'}`}
            required
          />
          <button
            onClick={() => handleSingleSubmit('codechef')}
            className="bg-purple-600 text-white px-4 rounded hover:bg-purple-700 transition cursor-pointer"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
     </div>
   
  );
};

export default Addprofile;
