import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Filters from './Filters';
import './GrievanceList';
import axios from 'axios';
import './GrievanceReport.css';

const GrievanceReport = () => {
    const [grievances, setGrievances] = useState([]);
    const [filteredGrievances, setFilteredGrievances] = useState([]);
    const [filters, setFilters] = useState({
        dateRange: { start: "", end: "" },
        status: "",
        department: ""
    });

    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchGrievances = async () => {
            try {
                const response = await axios.get('http://localhost:8989/grievance/getAll');
                const sortedGrievances = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                setGrievances(sortedGrievances);
                setFilteredGrievances(sortedGrievances);
            } catch (error) {
                console.error("Error fetching grievances:", error);
            }
        };

        fetchGrievances();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        let filteredData = grievances;

        if (filters.dateRange.start) {
            filteredData = filteredData.filter(grievance =>
                new Date(grievance.date) >= new Date(filters.dateRange.start)
            );
        }
        if (filters.dateRange.end) {
            filteredData = filteredData.filter(grievance =>
                new Date(grievance.date) <= new Date(filters.dateRange.end)
            );
        }
        if (filters.status) {
            filteredData = filteredData.filter(grievance => grievance.status === filters.status);
        }
        if (filters.department) {
            filteredData = filteredData.filter(grievance => grievance.department === filters.department);
        }

        setFilteredGrievances(filteredData);
    }, [filters, grievances]);

    const handleLogout = () => {
        // Clear any authentication tokens or states here if necessary
        navigate('/ceo-login'); // Navigate to the CEO login page
    };

    return (
        <div>
            <h1>Grievance Report</h1>

           

            {/* Filters component */}
            <Filters filters={filters} setFilters={setFilters} />

            <table className="table">
                <thead>
                    <tr>
                        <th>Grievance Id</th>
                        <th>Date</th>
                        <th>Department</th>
                        <th>Designation</th>
                        <th>Employee Name</th>
                        <th>Complainant Name</th>
                        <th>Grievance Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredGrievances.map(grievance => (
                        <tr key={grievance.grievanceId}>
                            <td>{grievance.grievanceId}</td>
                            <td>{formatDate(grievance.date)}</td>
                            <td>{grievance.department}</td>
                            <td>{grievance.designation}</td>
                            <td>{grievance.employeeName}</td>
                            <td>{grievance.complainantName}</td>
                            <td>{grievance.type}</td>
                            <td>{grievance.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

             {/* Logout Button */}
             <button onClick={handleLogout} className="logout-button" style={{backgroundColor: 'darkred', padding: '5px', margin: "5px"}}>
                Logout
            </button>
        </div>
    );
};

export default GrievanceReport;
