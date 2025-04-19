import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { themeState } from '../recoil/themeAtom'; 

const Home = () => {
  const theme = useRecoilValue(themeState); 

  return (
    <div className={`min-h-screen font-sans ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      
      {/* Hero Section */}
      <section className="text-center py-28 px-4">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">
          Track Your <span className="text-blue-500 wave-animate">
            {"Coding Journey".split("").map((char, i) => (
              <span key={i}>{char}</span>
            ))}
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8">
          Monitor your performance, achievements, and streaks across platforms.
        </p>
        <Link to="/register">
          <button className="bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-xl text-lg font-semibold cursor-pointer">
            Get Started
          </button>
        </Link>
      </section>

      {/* Features Section */}
      <section className={`${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-10'} px-6 py-20`}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {[
            {
              title: "Multi-Platform Tracker",
              desc: "Track your stats from Codeforces, LeetCode, and more."
            },
            {
              title: "Live Streak Monitor",
              desc: "Never lose your coding streak with real-time updates."
            },
            {
              title: "Achievements & Badges",
              desc: "Unlock milestones and track your learning journey."
            },
          ].map((feature, index) => (
            <div key={index} className={`bg-${theme === 'dark' ? 'gray-800' : 'gray-200'} rounded-xl p-6 shadow-md hover:shadow-blue-500/30 transition duration-300`}>
              <h3 className="text-2xl font-semibold mb-2 text-blue-400">{feature.title}</h3>
              <p className={`text-${theme === 'dark' ? 'gray-300' : 'gray-800'}`}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Preview Section */}
            <section className={`px-6 py-20 ${theme === 'dark' ? 'bg-gradient-to-r from-gray-900 to-gray-800' : 'bg-gradient-to-r from-white-300 to-white-200'} text-center`}>
            <h2 className="text-3xl font-bold mb-6">Preview a Sample Profile</h2>
            <div className={`max-w-md mx-auto ${theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-800'} rounded-xl p-6 border ${theme === 'dark' ? 'border-gray-100' : 'border-gray-300'}`}>
                <h3 className="text-xl font-semibold mb-2">Rajeev Kumar</h3>
                <p className="mb-1">Codeforces Rating: 1820</p>
                <p className="mb-1">LeetCode Problems Solved: 250+</p>
                <p className="text-green-400 font-semibold mt-4">🔥 21-Day Streak</p>
            </div>
            </section>

            {/* CTA Section */}
            <section className={`text-center py-20 px-4 ${theme === 'dark' ? 'bg-gray' : 'bg-blue'}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Level Up?</h2>
            <p className={`text-${theme === 'dark' ? 'gray-400' : 'gray-600'} mb-6`}>Join us and supercharge your coding habits!</p>
            <Link to="/login">
                <button className="bg-blue-600 hover:bg-blue-700 transition px-8 py-3 rounded-xl text-lg font-semibold cursor-pointer">
                Join Now
                </button>
            </Link>
            </section>

               {/* Footer */}
            <footer className={`text-gray-500 text-center py-6 ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100'}`}>
            <p>© {new Date().getFullYear()} CodeYatra . All rights reserved.</p>
            <div className="mt-2 space-x-4">
                <a href="https://github.com/rajeevroy21" className="hover:text-white">GitHub</a>
                <a href="/about" className="hover:text-white">About</a>
                <a href="/contact" className="hover:text-white">Contact</a>
            </div>
            </footer>

    </div>
  );
};

export default Home;
