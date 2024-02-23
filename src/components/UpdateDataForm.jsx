import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateDataForm = ({ data, onUpdate }) => {
  const [formData, setFormData] = useState({
    ...data, // Pre-fill form with existing data
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    // Implement your form validation logic here
    const errors = {};
    // ... validation logic
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setUpdateSuccess(false);
    setUpdateError(null);

    try {
      const response = await axios.put(`/api/football/update/${data.id}`, formData);
      console.log(response.data);
      setUpdateSuccess(true);
      // Trigger callback to update parent component (optional)
      onUpdate && onUpdate();
    } catch (err) {
      console.error(err);
      setUpdateError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}className="row g-3">
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
      {/* ... other form fields ... */}
      <div className="col-12">
       <button type="submit" disabled={isSubmitting} className="btn btn-primary">
        Update Data
      </button>
      </div>
      {Object.keys(validationErrors).map((field) => (
        <p key={field} className="error-message">{validationErrors[field]}</p>
      ))}
      {isSubmitting && <p>Updating data...</p>}
      {updateSuccess && <p>Data updated successfully!</p>}
      {updateError && <p>Error updating data: {updateError}</p>}
    </form>
  );
};

export default UpdateDataForm;
