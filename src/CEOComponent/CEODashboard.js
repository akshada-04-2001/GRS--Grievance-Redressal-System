// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Box,
//   Typography,
//   Grid,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Button,
// } from '@mui/material';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
// import { LineChart, Line } from 'recharts'; 
// import { useNavigate } from 'react-router-dom';

// const CEODashboard = () => {
//   const [pendingGrievanceCount, setPendingGrievanceCount] = useState(0);
//   const [departmentData, setDepartmentData] = useState([]);
//   const [dailyTrendData, setDailyTrendData] = useState([]);
//   const [topEmployees, setTopEmployees] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch all grievances data from the Grievance Report API
//     axios.get('http://localhost:8989/grievance/getAll')
//       .then(response => {
//         const grievances = response.data;

//         // Calculate pending grievances count
//         const pendingCount = grievances.filter(g => g.status === 'Pending').length;
//         setPendingGrievanceCount(pendingCount);

//         // Prepare department-wise data for BarChart
//         const departmentMap = {};
//         grievances.forEach(grievance => {
//           if (departmentMap[grievance.department]) {
//             departmentMap[grievance.department] += 1;
//           } else {
//             departmentMap[grievance.department] = 1;
//           }
//         });
//         const departmentData = Object.keys(departmentMap).map(department => ({
//           department,
//           grievances: departmentMap[department],
//         }));
//         setDepartmentData(departmentData);

//         // Prepare daily trend data for LineChart
//         const dailyMap = {};
//         grievances.forEach(grievance => {
//           const date = grievance.date.split('T')[0]; // Extract the date part
//           if (dailyMap[date]) {
//             dailyMap[date] += 1;
//           } else {
//             dailyMap[date] = 1;
//           }
//         });
//         const dailyTrendData = Object.keys(dailyMap).map(day => ({
//           day,
//           grievances: dailyMap[day],
//         }));
//         setDailyTrendData(dailyTrendData);

//       })
//       .catch(error => console.error('Error fetching grievances:', error));

//     // Optionally, fetch top employees with pending grievances
//     axios.get('http://localhost:8989/api/ceo/dashboard/top-pending-employees')
//       .then(response => {
//         setTopEmployees(response.data);
//       })
//       .catch(error => console.error('Error fetching top employees:', error));
//   }, []);

//   const handleNavigateToReport = () => {
//     navigate('/ceo/grievance-report');
//   };

//   return (
//     <Box sx={{ padding: '20px' }}>
//       <Typography variant="h4" gutterBottom>
//         CEO Dashboard
//       </Typography>

//       <Grid container spacing={2}>
        
//         {/* Pending Grievances Count */}
//         <Grid item xs={12} md={4}>
//           <Paper elevation={3} sx={{ padding: '20px' }}>
//             <Typography variant="h6">Pending Grievances</Typography>
//             <Typography variant="body1">Total Pending: {pendingGrievanceCount}</Typography>
//           </Paper>
//         </Grid>

//         {/* Department-wise BarChart */}
//         <Grid item xs={12} md={8}>
//           <Paper elevation={3} sx={{ padding: '20px' }}>
//             <Typography variant="h6">Department-wise Grievances</Typography>
//             <BarChart width={500} height={300} data={departmentData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="department" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="grievances" fill="#8884d8" />
//             </BarChart>
//           </Paper>
//         </Grid>

//         {/* Daily Grievance Trends LineChart */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ padding: '20px' }}>
//             <Typography variant="h6">Daily Grievance Trends</Typography>
//             <LineChart width={500} height={300} data={dailyTrendData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="grievances" stroke="#82ca9d" />
//             </LineChart>
//           </Paper>
//         </Grid>

//         {/* Top Employees with Pending Grievances */}
//         <Grid item xs={12} md={6}>
//           <Paper elevation={3} sx={{ padding: '20px' }}>
//             <Typography variant="h6">Top Employees with Pending Grievances</Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Employee Name</TableCell>
//                     <TableCell>Pending Grievances</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {topEmployees.map((employee, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{employee.name}</TableCell>
//                       <TableCell>{employee.pending}</TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Paper>
//         </Grid>

//         {/* Navigation to Grievance Report */}
//         <Grid item xs={12} md={12}>
//           <Button variant="contained" onClick={() =>navigate('/grievance-report')}>
//             View Grievance Report
//           </Button>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default CEODashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts'; 
import { useNavigate } from 'react-router-dom';

const CEODashboard = () => {
  const [pendingGrievanceCount, setPendingGrievanceCount] = useState(0);
  const [departmentData, setDepartmentData] = useState([]);
  const [dailyTrendData, setDailyTrendData] = useState([]);
  const [topEmployees, setTopEmployees] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here
    // e.g., remove token, clear session, etc.
    alert('You have been logged out');
    navigate('/ceo-login');
  };
  useEffect(() => {
    // Fetch all grievances data from the Grievance Report API
    axios.get('http://localhost:8989/grievance/getAll')
      .then(response => {
        const grievances = response.data;

        // Calculate pending grievances count
        const pendingCount = grievances.filter(g => g.status === 'pending').length;
        setPendingGrievanceCount(pendingCount);

        // Prepare department-wise data for BarChart
        const departmentMap = {};
        grievances.forEach(grievance => {
          if (departmentMap[grievance.department]) {
            departmentMap[grievance.department] += 1;
          } else {
            departmentMap[grievance.department] = 1;
          }
        });
        const departmentData = Object.keys(departmentMap).map(department => ({
          department,
          grievances: departmentMap[department],
        }));
        setDepartmentData(departmentData);

        // Prepare daily trend data for LineChart
        const dailyMap = {};
        grievances.forEach(grievance => {
          const date = grievance.date.split('T')[0]; // Extract the date part
          if (dailyMap[date]) {
            dailyMap[date] += 1;
          } else {
            dailyMap[date] = 1;
          }
        });
        const dailyTrendData = Object.keys(dailyMap).map(day => ({
          day,
          grievances: dailyMap[day],
        }));
        setDailyTrendData(dailyTrendData);

        // Calculate top 10 employees with pending grievances
        const employeePendingMap = {};
        grievances.forEach(grievance => {
          if (grievance.status === 'pending') {
            if (employeePendingMap[grievance.employeeName]) {
              employeePendingMap[grievance.employeeName] += 1;
            } else {
              employeePendingMap[grievance.employeeName] = 1;
            }
          }
        });

        // Convert employeePendingMap to an array and sort by pending count
        const sortedEmployees = Object.keys(employeePendingMap)
          .map(employee => ({
            name: employee,
            pending: employeePendingMap[employee],
          }))
          .sort((a, b) => b.pending - a.pending)
          .slice(0, 10); // Get top 10 employees
        setTopEmployees(sortedEmployees);
      })
      .catch(error => console.error('Error fetching grievances:', error));
  }, []);

  const handleNavigateToReport = () => {
    navigate('/ceo/grievance-report');
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        CEO Dashboard
      </Typography>

      <Grid container spacing={2}>
        
        {/* Pending Grievances Count */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Pending Grievances</Typography>
            <Typography variant="body1">Total Pending: {pendingGrievanceCount}</Typography>
          </Paper>
        </Grid>

        {/* Department-wise BarChart */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Department-wise Grievances</Typography>
            <BarChart width={500} height={300} data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="department" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="grievances" fill="#8884d8" />
            </BarChart>
          </Paper>
        </Grid>

        {/* Daily Grievance Trends LineChart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Daily Grievance Trends</Typography>
            <LineChart width={500} height={300} data={dailyTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="grievances" stroke="#82ca9d" />
            </LineChart>
          </Paper>
        </Grid>

        {/* Top Employees with Pending Grievances */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: '20px' }}>
            <Typography variant="h6">Top Employees with Pending Grievances</Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Employee Name</TableCell>
                    <TableCell>Pending Grievances</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {topEmployees.map((employee, index) => (
                    <TableRow key={index}>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.pending}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        {/* Navigation to Grievance Report */}
        <Grid item xs={12} md={12}>
        <Button variant="contained" onClick={() =>navigate('/grievance-report')}>
            View Grievance Report
          </Button>
        </Grid>


        <Grid item xs={12} md={12}>
        <Button variant="contained" onClick={() =>navigate('/ceo-grievance-tracking')}>
            View Tracking Report
          </Button>
        </Grid>
        <Grid item xs={12} md={12}>
        <div>
          <Button variant="contained" onClick={handleLogout} style={{backgroundColor: 'darkred'}}>
            Logout
          </Button>
        </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CEODashboard;
