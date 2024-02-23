import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddDataForm from './components/AddDataForm';
import UpdateDataForm from './components/UpdateDataForm';
import TotalStats from './components/TotalStats';
import DeleteRecord from './components/DeleteRecord';
import TopTeams from './components/TopTeams';
import AvgGoals from './components/AvgGoals';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation (optional) */}
        <nav className="d-flex flex-row justify-content-between">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/add-data">Add Data</a></li>
            <li><a href="/update-data">Update Data</a></li>
            <li><a href="/total-stats">Total Stats</a></li>
            <li><a href="/delete-record">Delete Record</a></li>
            <li><a href="/top-teams">Top Teams</a></li>
            <li><a href="/avg-goals">Average Goals</a></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-data" element={<AddDataForm />} />
          <Route path="/update-data" element={<UpdateDataForm />} />
          <Route path="/total-stats" element={<TotalStats />} />
          <Route path="/delete-record" element={<DeleteRecord />} />
          <Route path="/top-teams" element={<TopTeams value={10} />} />
          <Route path="/avg-goals" element={<AvgGoals year={2023} value={2} />} />
        </Routes>
      </div>
    </Router>
  );
}

const Home = () => {
  return (
    <h2>Welcome to the Football Data App!</h2>
  );
};

export default App;
