import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #d32f2f;
  }
`;

const LogoutButton = () => {
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  const handleLogout = () => {
    // Clear the access token from localStorage
    localStorage.removeItem('accessToken');
    // Navigate to the login page
    navigate('/login'); // Use navigate function instead of history.push
  };

  return (
    <StyledButton onClick={handleLogout}>
      Logout
    </StyledButton>
  );
};

export default LogoutButton;
