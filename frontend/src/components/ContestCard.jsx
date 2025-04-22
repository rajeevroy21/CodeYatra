import React, { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import { themeState } from "../recoil/themeAtom";

const ContestCard = ({ contest }) => {
  const [now, setNow] = useState(Date.now());
  const theme = useRecoilValue(themeState); 
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function getcountdown(startTime) {
    const diff = startTime - now;
    if (diff <= 0) return "Started";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  }
  const newurl = contest.site === "codeforces" ? changeURL(contest.url) : contest.url;

  // Create Google Calendar URL
  const createGoogleCalendarUrl = () => {
    const startDate = formatTimegoogle(contest.startTime);
    const endDate = formatTimegoogle(contest.endTime);
    const eventTitle = encodeURIComponent(contest.title);
    const description = encodeURIComponent(`Platform: ${contest.site} | from :- Codeyatra`);
    const location = encodeURIComponent(newurl);

    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventTitle}&dates=${startDate}/${endDate}&details=${description}&location=${location}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 border hover:shadow transition-all flex flex-col items-start ">
      <h2 className="text-2xl font-semibold text-gray-800 ">{contest.title}</h2>
      <p className="text-gray-600">
        <span className="font-medium">Platform:</span> {contest.site}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">Start:</span> {formatTime(contest.startTime)}
      </p>
      <p className="text-gray-600">
        <span className="font-medium">End:</span> {contest.site === 'leetcode' ? formatTime(contest.startTime + 5400000) : formatTime(contest.endTime)}
      </p>
      <p className="text-sm font-bold text-green-600 flex items-center gap-2">
        <FaRegClock />
        <span>Starts in: {getcountdown(contest.startTime)}</span>
      </p>

      <div className="flex gap-3 mt-2">
        {contest.site === "codeforces" ? (
          <a
            href={changeURL(contest.url)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md transition-colors"
          >
            Go to Contest
          </a>
        ) : (
          <a
            href={contest.url}
            target="_blank"
            rel="noopener noreferrer"
             className="inline-block text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md transition-colors"
          >
            Go to Contest
          </a>
        )
        }

        <a
          href={createGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-white bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-md transition-colors"
        >
          Add to Calendar
        </a>
      </div>
    </div>
  );
};

function changeURL(contesturl) {
  const temp = contesturl.split("/");
  const sz = temp.length;
  return `https://codeforces.com/contests/${temp[sz - 1]}`;
}
const formatTime = (timestamp) => {
  return new Date(timestamp).toLocaleString();
};
const formatTimegoogle = (timestamp) => {
  const date = new Date(timestamp);
  return date.toISOString().replace(/[-:.]/g, "").split(".")[0] + "Z";
};

export default ContestCard;
