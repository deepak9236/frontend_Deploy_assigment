import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AuthService from '../../services/AuthService';

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full height of the viewport */
`;

const SignupForm = styled.div`
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

    &:focus {
        border-color: blue;
    }
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

const SignUpMessage = styled.p`
    text-align: center;
    margin-top: 10px;
`;

const Message = styled.p`
    color: ${({ error }) => (error ? 'red' : 'green')};
`;

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [signupError, setSignupError] = useState('');

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await AuthService.signup(username, password);
            console.log('Signup successful');
            setSignupSuccess(true);
        } catch (error) {
            console.error('Signup error:', error);
            setSignupError('Signup unsuccessful. User already exists with this ID.');
        }
    };

    return (
        <Container>
            <SignupForm>
                <h2>Signup</h2>
                <form onSubmit={handleSignup}>
                    <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="submit">Signup</Button>
                </form>
                {signupSuccess ? (
                    <Message>Signup successful. <Link to="/login">Click here to login.</Link></Message>
                ) : (
                    <Message error>{signupError}</Message>
                )}
                <SignUpMessage>
                    Click <a href="/login">here</a> to Login.
                </SignUpMessage>
            </SignupForm>
        </Container>
    );
};

export default Signup;
