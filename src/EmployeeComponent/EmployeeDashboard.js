import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Button } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './EmployeeDashboard.css'; // Importing the CSS file

const EmployeeDashboard = () => {
  const [data, setData] = useState([
    { name: "pending", count: 0 },
    { name: "resolved", count: 0 },
    { name: "rejected", count: 0 },
    { name: "transferred", count: 0 },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrievanceData = async () => {
      try {
        const response = await axios.get("http://localhost:8989/grievance/getAll");
        const fetchedGrievances = response.data;

        const pendingCount = fetchedGrievances.filter(grievance => grievance.status === "pending").length;
        const resolvedCount = fetchedGrievances.filter(grievance => grievance.status === "resolved").length;
        const rejectedCount = fetchedGrievances.filter(grievance => grievance.status === "rejected").length;
        const transferredCount = fetchedGrievances.filter(grievance => grievance.status === "transferred").length;

        setData([
          { name: "pending", count: pendingCount },
          { name: "resolved", count: resolvedCount },
          { name: "rejected", count: rejectedCount },
          { name: "transferred", count: transferredCount },
        ]);
      } catch (error) {
        console.error("Error fetching grievance data:", error);
      }
    };

    fetchGrievanceData();
  }, []);

  const handleReportClick = () => {
    navigate("/employee-grievancereport");
  };

  return (
    <Box className="dashboard-container">
      <Typography variant="h4" gutterBottom className="dashboard-title">
        Employee Dashboard
      </Typography>

      <Card className="card">
        <CardContent>
          <Typography variant="h6" align="left" gutterBottom>
            Status Overview
          </Typography>

          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickCount={6} domain={[0, 'dataMax + 1']} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Button
        variant="contained"
        color="primary"
        onClick={handleReportClick}
        className="report-button"
      >
        Employee Report
      </Button>
    </Box>
  );
};

export default EmployeeDashboard;
