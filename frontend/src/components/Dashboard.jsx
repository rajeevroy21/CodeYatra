import React from 'react';
import CodechefCard from './CodechefCard';
import LeetcodeCard from './LeetcodeCard';
import CodeforcesCard from './CodeforcesCard';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-20 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">👨‍💻 Your Coding Profiles</h1>
      <div className="flex flex-wrap justify-center gap-8">
        <LeetcodeCard/>
        <CodeforcesCard/>
        <CodechefCard/>
      </div>
    </div>
  );
};

export default Dashboard;
