import React, { useState } from 'react';
import axios from 'axios';
import './GrievanceTrackingPage.css'; // Import the CSS file

const GrievanceTrackingPage = () => {
  const [searchId, setSearchId] = useState('');
  const [grievance, setGrievance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    setError('');

    try {
      // Correct URL for fetching grievance by ID
      const response = await axios.get(`http://localhost:8989/grievance/${searchId}`);
      setGrievance(response.data);
    } catch (err) {
      setError('Failed to fetch grievance. Please check the ID and try again.');
      setGrievance(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Grievance Tracking</h1>
      
      <div className="search-container">
        <input 
          type="number" 
          placeholder="Enter Grievance Number" 
          value={searchId} 
          onChange={(e) => setSearchId(e.target.value)} 
          className="input"
        />
        <button onClick={handleSearch} className="button">Search</button>
      </div>
  
      {loading && <p className="loading-message">Loading grievance...</p>}
      {error && <p className="error-message">{error}</p>}
  
      {grievance ? (
        <div className="grievance-container">
          <h2 className="grievance-title">Grievance {grievance.id}: {grievance.title}</h2>
          <h3 className="timeline-title">Timeline:</h3>
          <ul className="timeline-list">
            {grievance.history && grievance.history.length > 0 ? (
              grievance.history.map((entry, index) => (
                <li key={index} className="timeline-item">
                  <strong>{entry.timestamp}</strong>: {entry.action} by {entry.responsible}
                </li>
              ))
            ) : (
              <li>No history available for this grievance.</li>
            )}
          </ul>
        </div>
      ) : (
        searchId && <p className="no-grievance-message">No grievance found with this number.</p>
      )}
    </div>
  );
};

export default GrievanceTrackingPage;
