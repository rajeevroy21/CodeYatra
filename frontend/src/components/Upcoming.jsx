import React, { useEffect, useState } from "react";
import ContestCard from "./ContestCard";  
import axios from "axios";
import Calender from "./Calender";
import Footer from "./Footer";
import { useRecoilValue } from "recoil";
import { themeState } from "../recoil/themeAtom";

const Upcoming = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useRecoilValue(themeState); 

  useEffect(() => {
    // Fetch upcoming contests data
    axios.get("https://competeapi.vercel.app/contests/upcoming")
      .then((res) => {
        setContests(res.data);  // Set the contest data
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);  // Log error if any
        setLoading(false);
      });
  }, []);

  return (
    <div className={`p-9 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'} min-h-screen`}>
      <h2 className={`text-2xl font-bold mb-6 text-center mt-10 `}>Upcoming Contests & Calendar</h2>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left: Upcoming Contests Section */}
        <div className="lg:w-1/3 bg-white rounded-xl shadow p-4">
          <h3 className={`text-lg ${theme === 'dark' ? 'text-black bg-gray' : 'text-black '} font-semibold mb-1 text-center`}>Upcoming Contests</h3>
          {loading ? (
            // Loading spinner while data is being fetched
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 overflow-y-auto max-h-[70vh]">
              {contests.map((contest, index) => (
                <ContestCard key={index} contest={contest} />
              ))}
            </div>
          )}
        </div>
        {/* Right: Calendar Section */}
         <Calender/>
      </div>
      <Footer/>
    </div>
  );
};

export default Upcoming;
