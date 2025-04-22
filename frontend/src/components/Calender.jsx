import React from 'react';
import { useRecoilValue } from 'recoil';
import { authState } from '../recoil/authAtom';
import { themeState } from '../recoil/themeAtom';

const Calender = () => {
  const useremail = useRecoilValue(authState)?.user?.email;

  return (
    <div className="lg:w-2/3 bg-white rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-1 text-center">Your Google Calendar</h3>
      {useremail ? (
        <iframe
          src={`https://calendar.google.com/calendar/embed?src=${encodeURIComponent(useremail)}&ctz=Asia/Kolkata`}
          style={{ border: "0" }}
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
        />
      ) : (
        <p className="text-center text-gray-500">No calendar to show. Please sign in.</p>
      )}
    </div>
  );
};

export default Calender;
