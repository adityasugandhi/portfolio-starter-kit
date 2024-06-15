// GitHubCalendar.js
import React, { useEffect } from 'react';
import 'github-calendar/dist/github-calendar-responsive.css';

const GitHubCalendar = ({ username }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/github-calendar@latest/dist/github-calendar.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (window.GitHubCalendar) {
      window.GitHubCalendar('.calendar', username, { responsive: true });
    }
  }, [username]);

  return (
    <div className="calendar m-4">
      {/* Loading message */}
      Loading the data just for you.
    </div>
  );
};

export default GitHubCalendar;
