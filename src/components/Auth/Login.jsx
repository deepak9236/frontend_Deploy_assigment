import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../services/AuthService';

// Styled components
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full height of the viewport */
`;

const LoginForm = styled.div`
    max-width: 300px;
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

    &:focus {
        border-color: blue;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: darkblue;
    }
`;

const ErrorMessage = styled.p`
    color: red;
`;

const SignUpMessage = styled.p`
    text-align: center;
    margin-top: 10px;
`;

const Login = ({ setIsLoggedIn }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const token = await AuthService.login(username, password);
            // Store token in localStorage for authentication
            localStorage.setItem('accessToken', token);
            // Set isLoggedIn to true
            setIsLoggedIn(true);
            // Navigate to the home page after successful login
            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setError('Invalid username or password');
            } else {
                setError('An error occurred while logging in. Please try again later.');
            }
            console.error('Login error:', error);
        }
    };

    return (
        <Container>
            <LoginForm>
                <h2>Login</h2>
                <h5>[username:- Deepak8321, password:- Deepak8321]</h5>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={handleLogin}>
                    <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit">Login</Button>
                </form>
                <SignUpMessage>
                    Click <a href="/signup">here</a> to Sign up.
                </SignUpMessage>
            </LoginForm>
        </Container>
    );
};

export default Login;
