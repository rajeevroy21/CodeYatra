import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/authAtom';
import axios from 'axios';

const CodechefCard = () => {
  const userId = useRecoilValue(authState)?.user?._id ; 
  const [codechefData, setCodechefData] = useState(null);
  const [error, setError] = useState(null);

  const getProfileUsernames = async () => {
    try {
      const res = await axios.get(`https://codeyatra.onrender.com/api/get-profile/${userId}`);
      return res.data;
    } catch (err) {
      setError('Failed to fetch profile from backend');
      console.error(err);
    }
  };

  const getCodechefStats = async (username) => {
    try {
      const res = await axios.get(`https://competeapi.vercel.app/user/codechef/${username}`);
      setCodechefData(res.data);
    } catch (err) {
      setError('Failed to fetch CodeChef stats');
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setError('User not logged in');
        return;
      }

      const profile = await getProfileUsernames();
      if (profile?.codechef) {
        await getCodechefStats(profile.codechef);
      } else {
        setError('CodeChef username not found in your profile');
      }
    };

    if (userId) {
      fetchData();
    } else {
      setError('User not logged in');
    }
  }, [userId]);

  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  if (!codechefData) return (
    <div className="text-center mt-10">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 mx-auto"></div>
      <p>Loading CodeChef data...</p>
    </div>
  );

  const {
    username,
    rating,
    rating_number,
    country,
    user_type,
    institution,
    global_rank,
    country_rank,
    max_rank
  } = codechefData;

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 mt-10">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full shadow mb-4 flex items-center justify-center bg-gray-300">
          <span className="text-white text-xl">No Image</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{username}</h2>
        <a
          href={`https://www.codechef.com/users/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:underline text-sm mt-1"
        >
          View Full Profile
        </a>
      </div>

      <div className="mt-6 space-y-4 text-gray-700">
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold">📊 Rating Info</h3>
          <p><strong>Stars:</strong> {rating || 'N/A'}</p>
          <p><strong>Rating:</strong> {rating_number || 'N/A'}</p>
          <p><strong>Max Rank:</strong> {max_rank || 'N/A'}</p>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold">🌍 Global Stats</h3>
          <p><strong>Global Rank:</strong> {global_rank || 'N/A'}</p>
          <p><strong>Country Rank (India):</strong> {country_rank || 'N/A'}</p>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold">🏫 Academic Info</h3>
          <p><strong>User Type:</strong> {user_type || 'N/A'}</p>
          <p><strong>Institution:</strong> {institution || 'N/A'}</p>
          <p><strong>Country:</strong> {country || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default CodechefCard;
