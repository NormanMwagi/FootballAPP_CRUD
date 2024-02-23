import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopTeams = ({ value }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/football/top-wins/${value}`);
        setTeams(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [value]);

  return (
    <div>
      <h2>Top Teams with Wins Greater Than {value}</h2>
      {teams.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Games Played</th>
              <th>Wins</th>
              <th>Draws</th>
              <th>Loss</th>
              <th>Goals For</th>
              <th>Goals Against</th>
              <th>Points</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id}>
                <td>{team.team}</td>
                <td>{team.gamesPlayed}</td>
                <td>{team.wins}</td>
                <td>{team.draws}</td>
                <td>{team.loss}</td>
                <td>{team.goalsFor}</td>
                <td>{team.goalsAgainst}</td>
                <td>{team.points}</td>
                <td>{team.year}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No teams found with wins greater than {value}.</p>
      )}
    </div>
  );
};

export default TopTeams;
