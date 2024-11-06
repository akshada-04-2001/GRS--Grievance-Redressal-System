import React, { useEffect, useState } from "react";
import axios from "axios";
import GrievanceTable from "./GrievanceTable";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  padding: 1rem;
  min-height: 100vh;
`;

const Title = styled.h3`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const LogoutButton = styled.button`
  margin-top: 2rem; /* Adds space above the button */
  padding: 10px 20px;
  background-color: #dc3545; /* Bootstrap danger color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333; /* Darker shade on hover */
  }
`;

const EmployeeGrievanceReport = () => {
  const [grievances, setGrievances] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8989/grievance/getAll"
        );
        console.log("Fetched grievances:", response.data);
        setGrievances(response.data);
      } catch (error) {
        console.error("Error fetching grievances:", error);
      }
    };

    fetchGrievances();
  }, []);

  const updateGrievanceStatus = (
    grievanceId,
    newStatus,
    rejectReason = null
  ) => {
    setGrievances((prevGrievances) =>
      prevGrievances.map((g) =>
        g.grievanceId === grievanceId
          ? { ...g, status: newStatus, rejectReason }
          : g
      )
    );
  };

  const handleAccept = async (grievanceId) => {
    try {
      const grievance = grievances.find((g) => g.grievanceId === grievanceId);
      const updatedGrievance = { ...grievance, status: "accepted" };
      await axios.put(
        `http://localhost:8989/grievance/${grievanceId}`,
        updatedGrievance
      );
      updateGrievanceStatus(grievanceId, "accepted");
    } catch (error) {
      console.error("Error accepting grievance:", error);
    }
  };

  const handleReject = async (grievanceId, reason) => {
    try {
      const grievance = grievances.find((g) => g.grievanceId === grievanceId);
      const updatedGrievance = {
        ...grievance,
        status: "rejected",
        rejectReason: reason,
      };
      await axios.put(
        `http://localhost:8989/grievance/${grievanceId}`,
        updatedGrievance
      );
      updateGrievanceStatus(grievanceId, "rejected", reason);
      alert(`Grievance ${grievanceId} rejected with reason: ${reason}`);
    } catch (error) {
      console.error("Error rejecting grievance:", error);
    }
  };

  const handleTransfer = async (grievanceId, transferDetails) => {
    try {
      const grievance = grievances.find((g) => g.grievanceId === grievanceId);
      const updatedGrievance = {
        ...grievance,
        department: transferDetails.department,
        status: "transferred",
        assignedTo: transferDetails.employeeName,
        designation: transferDetails.designation,
      };
      await axios.put(
        `http://localhost:8989/grievance/${grievanceId}`,
        updatedGrievance
      );
      setGrievances((prevGrievances) =>
        prevGrievances.map((g) =>
          g.grievanceId === grievanceId ? updatedGrievance : g
        )
      );
      alert(
        `Grievance ${grievanceId} transferred to ${transferDetails.employeeName} (${transferDetails.designation} in ${transferDetails.department})`
      );
    } catch (error) {
      console.error("Error transferring grievance:", error);
    }
  };

  const handleResolve = async (grievanceId) => {
    try {
      const grievance = grievances.find((g) => g.grievanceId === grievanceId);
      const updatedGrievance = { ...grievance, status: "resolved" };
      await axios.put(
        `http://localhost:8989/grievance/${grievanceId}`,
        updatedGrievance
      );
      updateGrievanceStatus(grievanceId, "resolved");
      alert(`Grievance ${grievanceId} resolved successfully.`);
    } catch (error) {
      console.error("Error resolving grievance:", error);
    }
  };

  const handleLogout = () => {
    navigate("/employee-login"); // Navigate to login page
  };

  return (
    <Container>
      <Title>EMPLOYEE GRIEVANCE REPORT</Title>
      <GrievanceTable
        grievances={grievances}
        onAccept={handleAccept}
        onReject={handleReject}
        onTransfer={handleTransfer}
        onResolve={handleResolve}
      />
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Container>
  );
};

export default EmployeeGrievanceReport;
