import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvgGoals = ({ year, value }) => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/football/avg-goals/${year}/${value}`);
        setTeams(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [year, value]);

  return (
    <div>
      <h2>Teams with Average Goal For Greater Than {value} in Year {year}</h2>
      {teams.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Team</th>
              <th>Average Goals For</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team) => (
              <tr key={team._id}>
                <td>{team._id}</td>
                <td>{team.avgGoalsFor.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No teams found with average goal for greater than {value} in year {year}.</p>
      )}
    </div>
  );
};

export default AvgGoals;
