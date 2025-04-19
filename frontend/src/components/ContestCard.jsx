import React, { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";

const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};

const ContestCard = ({ contest }) => {
  const [now, setNow] = useState(Date.now());

  useEffect(()=>{
    const timer=setInterval(()=>{
      setNow(Date.now());
    },1000);
    return () => clearInterval(timer);
  },[]);

function getcountdown(startTime){ 
    const diff = startTime - now;
    if (diff <= 0) return "Started";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`; 
}

  return (
    <div className="bg-white rounded-xl shadow p-4 border hover:shadow-md transition-all flex flex-col items-center">
      <h2 className="text-xl font-semibold mb-1">{contest.title}</h2>
      <p className="text-gray-600 mb-1">Platform: {contest.site}</p>
      <p className="text-gray-600 mb-1">Start: {formatTime(contest.startTime)}</p>
      <p className="text-gray-600 mb-1">End: {contest.site=='leetcode'?formatTime(contest.startTime+5400000 ):formatTime(contest.endTime)}</p> 
      <p className="text-sm font-bold text-green-600 mt-2 flex items-center gap-2"><FaRegClock />
          Start in {getcountdown(contest.startTime)} </p>
       {contest.site === "codeforces" ? <a
        href={changeURL(contest.url)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-blue-600 hover:underline"
      >
        Go to Contest
      </a> : <a
        href={contest.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-2 text-blue-600 hover:underline"
      >
        Go to Contest
      </a>}
    </div>
  );
};

function changeURL(contesturl){
  const temp = contesturl.split('/')
  const sz = temp.length
  return `https://codeforces.com/contests/${temp[sz-1]}`
}
export default ContestCard;
