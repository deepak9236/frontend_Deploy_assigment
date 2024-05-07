import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatabaseManagement from './DatabaseManagement';
import InstanceManagement from './InstanceManagement';
import UserManagement from './UserManagement';
import LogoutButton from '../components/Auth/LogoutButton';

const Dashboard = () => {

    return (
<Container>
            <TopRightCorner>
                <LogoutButton /> {/* Add the logout button */}
            </TopRightCorner>
            <h2>Dashboard</h2>

            <DatabaseManagement />

            <InstanceManagement />

            <UserManagement />
        </Container>
    );
};

export default Dashboard;

// Styled components
const Container = styled.div`
    position: relative; /* Ensure relative positioning for the absolute positioning of the logout button */
    background-color: #f4f4f4;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    h2 {
        margin-bottom: 20px;
    }
`;

const TopRightCorner = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;