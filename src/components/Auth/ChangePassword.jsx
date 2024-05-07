import React, { useState } from 'react';
import styled from 'styled-components';
import UserService from '../../services/UserService';

// Styled components
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full height of the viewport */
`;

const PasswordForm = styled.div`
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: darkblue;
    }
`;

const ChangePassword = ({ userId }) => {
    const [password, setPassword] = useState('');

    const handleChangePassword = async () => {
        try {
            await UserService.changePassword(userId, password);
            console.log('Password changed successfully');
        } catch (error) {
            console.error('Error changing password:', error);
        }
    };

    return (
        <Container>
            <PasswordForm>
                <h2>Change Password</h2>
                <Input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button onClick={handleChangePassword}>Change Password</Button>
            </PasswordForm>
        </Container>
    );
};


export default ChangePassword;
