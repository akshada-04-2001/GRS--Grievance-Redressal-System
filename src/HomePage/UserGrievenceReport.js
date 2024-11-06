
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserGrievenceReport.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserGrievanceReport = () => {
    const [grievances, setGrievances] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add your logout logic here
        // e.g., remove token, clear session, etc.
        alert('You have been logged out');
        navigate('/user-login');
      };

    useEffect(() => {
        const fetchGrievances = async () => {
            try {
                // Update the URL to match your backend endpoint
                const response = await axios.get('http://localhost:8989/grievance/getAll'); // Replace with your actual API endpoint
                setGrievances(response.data);
            } catch (error) {
                console.error("Error fetching grievances:", error);
            }
        };

        fetchGrievances();
    }, []);

    return (
        <div>
            <h1>Grievance Report</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Grievance Id</th>
                        <th>Date</th>
                        <th>Department</th>
                        <th>Designation</th> {/* Added Designation column */}
                        <th>Employee Name</th>
                        <th>Complainant Name</th>
                        <th>Grievance Type</th>
                        <th>Status</th> {/* Removed Aadhaar Number as per your request */}
                    </tr>
                </thead>
                <tbody>
                    {grievances.map(grievance => (
                        <tr key={grievance.grievanceId}>
                            <td>{grievance.grievanceId}</td> {/* Display Grievance ID */}
                            <td>{grievance.date}</td>
                            <td>{grievance.department}</td>
                            <td>{grievance.designation}</td> {/* Display Designation */}
                            <td>{grievance.employeeName}</td>
                            <td>{grievance.complainantName}</td>
                            <td>{grievance.type}</td>
                            <td>{grievance.status}</td> {/* Display status */}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{margin: '10px', width: '200px'}}>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>


        </div>
    );
};

export default UserGrievanceReport;

