import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TotalStats = ({ year }) => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/football/totals/${year}`);
        setStats(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [year]);

  return (
    <div>
      <h2>Total Stats for Year {year}</h2>
      {Object.keys(stats).length > 0 ? (
        <ul>
          <li>Total Games Played: {stats.totalGamesPlayed}</li>
          <li>Total Draws: {stats.totalDraws}</li>
          <li>Total Wins: {stats.totalWins}</li>
        </ul>
      ) : (
        <p>No stats found for year {year}.</p>
      )}
    </div>
  );
};

export default TotalStats;
