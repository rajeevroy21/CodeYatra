import React, { useEffect, useState } from "react";
import ContestCard from "./ContestCard";
import axios from "axios";

const Upcoming = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://competeapi.vercel.app/contests/upcoming")
      .then((res) => {
        setContests(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-center mt-15">Upcoming Contests</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto flex flex-col gap-5">
          {contests.map((contest, index) => (
            <ContestCard key={index} contest={contest} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Upcoming;
