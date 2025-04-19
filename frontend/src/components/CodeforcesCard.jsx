import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/authAtom';
import axios from 'axios';

const CodeforcesCard = () => {
  const userId = useRecoilValue(authState).user?._id;
  const [cfProfile, setCfProfile] = useState(null);
  const [cfContests, setCfContests] = useState([]);
  const [error, setError] = useState(null);

  const getProfileUsernames = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/get-profile/${userId}`);
      return res.data;
    } catch (err) {
      setError('Failed to fetch profile from backend');
      console.error('Error fetching profile from backend:', err);
    }
  };

  const getCodeforcesStats = async (cfUsername) => {
    try {
      const res = await axios.get(`https://competeapi.vercel.app/user/codeforces/${cfUsername}`);
      if (res.data.length >= 2) {
        setCfProfile(res.data[0]);
        setCfContests(res.data[1].ratings);
      } else {
        setError('Invalid Codeforces data');
      }
    } catch (err) {
      setError('Failed to fetch Codeforces stats');
      console.error('Error fetching Codeforces stats:', err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setError('User not logged in');
        return;
      }

      const profile = await getProfileUsernames();

      if (profile?.codeforces) {
        await getCodeforcesStats(profile.codeforces);
      } else {
        setError('Codeforces username not found in your profile');
      }
    };

    if (userId) {
      fetchData();
    } else {
      setError('User not logged in');
    }
  }, [userId]); 
  const formatDate = (seconds) => {
    const date = new Date(seconds * 1000);
    return date.toLocaleDateString();
  };

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!cfProfile || cfContests.length === 0) {
    return (
      <div className="text-center mt-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto"></div>
        <p>Loading Codeforces data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 mt-10">
      <div className="flex flex-col items-center">
        <img src={cfProfile.avatar || '/default-avatar.png'} alt="User Avatar" className="w-24 h-24 rounded-full shadow mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">{cfProfile.handle}</h2>
        <a href={`https://codeforces.com/profile/${cfProfile.handle}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline text-sm mt-1">
          View Full Profile
        </a>
      </div>

      <div className="mt-6 space-y-4 text-gray-700">
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold">🏅 Rating & Rank</h3>
          <p><strong>Rating:</strong> {cfProfile.rating || 'N/A'}</p>
          <p><strong>Max Rating:</strong> {cfProfile.maxRating || 'N/A'} ({cfProfile.maxRank || 'N/A'})</p>
          <p><strong>Current Rank:</strong> {cfProfile.rank || 'N/A'}</p>
          <p><strong>Organization:</strong> {cfProfile.organization || 'N/A'}</p>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold">📊 Contest Stats</h3>
          {cfContests.length > 0 ? (
            <ul className="space-y-1 text-sm">
              {cfContests.slice(-5).reverse().map((contest, index) => (
                <li key={index}>
                  <strong>{contest.contestName}</strong> — New Rating: <span className="text-green-600">{contest.newRating}</span>, Rank: {contest.rank}
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent contests found.</p>
          )}
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold">🔥 Activity</h3>
          <p><strong>Friends:</strong> {cfProfile.friendOfCount || 'N/A'}</p>
          <p><strong>Contribution:</strong> {cfProfile.contribution || 'N/A'}</p>
          <p><strong>Last Online:</strong> {formatDate(cfProfile.lastOnlineTimeSeconds) || 'N/A'}</p>
          <p><strong>Joined:</strong> {formatDate(cfProfile.registrationTimeSeconds) || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default CodeforcesCard;
