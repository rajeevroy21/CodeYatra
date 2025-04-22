import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/authAtom';
import axios from 'axios';

const LeetcodeCard = () => {
  const userId = useRecoilValue(authState)?.user?._id; 
  const [leetcodeData, setLeetcodeData] = useState(null);
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

  const getLeetcodeStats = async (leetcodeUsername) => {
    try {
      const res = await axios.get(`https://competeapi.vercel.app/user/leetcode/${leetcodeUsername}`);
      setLeetcodeData(res.data);
    } catch (err) {
      setError('Failed to fetch LeetCode stats');
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if(!userId)
      {
        setError('User not logged in');
        return;
      }
      const profile = await getProfileUsernames();
      if (profile?.leetcode) {
        await getLeetcodeStats(profile.leetcode);
      } else {
        setError('LeetCode username not found in your profile');
      }
    };
    if (userId) {
      fetchData();
    }
    else
    {
      setError('User not logged in');
    }
  }, [userId]);

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!leetcodeData) {
    return (
      <div className="text-center mt-10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto"></div>
        <p>Loading LeetCode data...</p>
      </div>
    );
  }

  const user = leetcodeData?.data?.matchedUser || {};
  const contest = leetcodeData?.data?.userContestRanking || {};
  const submissions = user?.submitStats?.acSubmissionNum || [];

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-6 px-25 hover:shadow-xl transition-shadow duration-300 mt-10">
      <div className="flex flex-col items-center">
        <img
          src={user?.profile?.userAvatar || 'https://via.placeholder.com/150'}
          alt="User Avatar"
          className="w-24 h-24 rounded-full shadow mb-4"
        />
        <h2 className="text-2xl font-bold text-gray-800">{user?.username || 'User'}</h2>
        <a
          href={`https://leetcode.com/${user?.username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm mt-1"
        >
          View Full Profile
        </a>
      </div>

      <div className="mt-6 space-y-4 text-gray-700">
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold">🚀 Problem Stats</h3>
          <p><strong>Total Solved:</strong> {submissions[0]?.count || 0}</p>
          <p>
            <strong>Easy:</strong> {submissions[1]?.count || 0} | <strong>Medium:</strong> {submissions[2]?.count || 0} |{' '}
            <strong>Hard:</strong> {submissions[3]?.count || 0}
          </p>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold">🏆 Contest Stats</h3>
          <p><strong>Rating:</strong> {contest?.rating?.toFixed(0) || 'N/A'}</p>
          <p><strong>Global Rank:</strong> {contest?.globalRanking?.toLocaleString() || 'N/A'}</p>
          <p><strong>Top %:</strong> {contest?.topPercentage?.toFixed(2) || 'N/A'}%</p>
          <p><strong>Contests Attended:</strong> {contest?.attendedContestsCount || 0}</p>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold">🔥 Activity</h3>
          <p><strong>Streak:</strong> {user?.userCalendar?.streak || 0} days</p>
          <p><strong>Active Days:</strong> {user?.userCalendar?.totalActiveDays || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default LeetcodeCard;
