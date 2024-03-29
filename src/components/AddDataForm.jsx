import React, { useState } from 'react';
import axios from 'axios';

const AddDataForm = () => {
  const [formData, setFormData] = useState({
    team: '',
    gamesPlayed: 0,
    wins: 0,
    draws: 0,
    loss: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    points: 0,
    year: 0
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionError, setSubmissionError] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.team) {
      errors.team = 'Team name is required.';
    }
    if (formData.gamesPlayed < 0) {
      errors.gamesPlayed = 'Games played cannot be negative.';
    }
    // Add similar validations for other fields
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionSuccess(false);
    setSubmissionError(null);

    try {
      const response = await axios.post('/api/football/add', formData);
      console.log(response.data);
      setFormData({
        team: '',
        gamesPlayed: 0,
        wins: 0,
        draws: 0,
        loss: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
        year: 0
      });
      setSubmissionSuccess(true);
    } catch (err) {
      console.error(err);
      setSubmissionError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
    <div className="col-md-6">
      <label htmlFor="team" className="form-label">Team Name:</label>
      <input
        type="text"
        name="team"
        value={formData.team}
        onChange={handleChange}
        id="team"
        className="form-control"
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="gamesPlayed" className="form-label">Games Played:</label>
      <input
        type="number"
        name="gamesPlayed"
        value={formData.gamesPlayed}
        onChange={handleChange}
        id="gamesPlayed"
        className="form-control"
      />
    </div>
    <div className="col-md-6">
      <label htmlFor="wins" className="form-label">Wins:</label>
      <input
        type="number"
        name="wins"
        value={formData.wins}
        onChange={handleChange}
        id="wins"
        className="form-control"
      />
    </div>
    
      {/* Add similar input fields for remaining data points (draws, loss, goalsFor, goalsAgainst, points, year) */}
      <div className="col-12">
    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
      Add Data
    </button>
    </div>
      {Object.keys(validationErrors).map((field) => (
        <p key={field} className="error-message">{validationErrors[field]}</p>
      ))}
      {isSubmitting && <p>Submitting data...</p>}
      {submissionSuccess && <p>Data added successfully!</p>}
      {submissionError && <p>Error adding data: {submissionError}</p>}
    </form>
  );
};

export default AddDataForm;
