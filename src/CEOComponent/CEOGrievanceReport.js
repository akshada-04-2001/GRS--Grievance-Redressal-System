import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import { format } from 'date-fns';  // Import date-fns for date formatting
import { Button } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { Link } from 'react-router-dom';

const CEOGrievanceReport = () => {
  const [grievances, setGrievances] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: '',
    status: '',
    department: '',
  });

  // Fetch grievances from backend API
  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await axios.get('http://localhost:8989/api/grievances');
        console.log('Fetched Grievances:', response.data);  // Log fetched data
        setGrievances(response.data);
      } catch (error) {
        console.error('Error fetching grievances:', error);
      }
    };

    fetchGrievances();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    console.log('Updated Filters:', { ...filters, [name]: value });  // Debug filter changes
  };

  // Debugging the data and filters before filtering
  console.log('Grievances data:', grievances);  // Check if data is being fetched correctly
  console.log('Current filters:', filters);     // Check current filter values

  const filteredGrievances = grievances.filter((grievance) => {
    const formattedGrievanceDate = format(new Date(grievance.date), 'yyyy-MM-dd');
    
    const matchesDate = !filters.dateRange || formattedGrievanceDate === filters.dateRange;
    const matchesStatus = !filters.status || grievance.status === filters.status;
    const matchesDepartment = !filters.department || grievance.department === filters.department;

    return matchesDate && matchesStatus && matchesDepartment;
  });

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        CEO Grievance Report
      </Typography>

      {/* Filters */}
      <Grid container spacing={2} sx={{ marginBottom: 2 }}>
        <Grid item xs={12} md={4}>
          <TextField
            label="Date Range"
            type="date"
            fullWidth
            name="dateRange"
            value={filters.dateRange}
            onChange={handleFilterChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Status"
            select
            fullWidth
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Resolved">Resolved</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            label="Department"
            select
            fullWidth
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Education">EDUCATION</MenuItem>
            <MenuItem value="Health">HEALTH</MenuItem>
            <MenuItem value="Finance">FINANCE</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Grievance Table */}
      <TableContainer component={Paper}>
        <Table aria-label="grievance table">
          <TableHead>
            <TableRow>
              <TableCell>Grievance Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Employee Assigned</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGrievances.length > 0 ? (
              filteredGrievances.map((grievance) => (
                <TableRow key={grievance.id}>
                  <TableCell>{grievance.grievanceNumber}</TableCell>
                  <TableCell>{format(new Date(grievance.date), 'dd-MM-yyyy')}</TableCell>
                  <TableCell>{grievance.department}</TableCell>
                  <TableCell>{grievance.employee}</TableCell>
                  <TableCell>{grievance.status}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No grievances found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
     
    </Box>
  );
};

export default CEOGrievanceReport;
