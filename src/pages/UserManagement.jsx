import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserService from '../services/UserService';

const Container = styled.div`
    margin: 20px;
`;

const Title = styled.h2`
    color: #333;
`;

const List = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const ListItem = styled.li`
    margin-bottom: 10px;
`;

const Button = styled.button`
    background-color: #1890ff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #40a9ff;
    }
`;

const Form = styled.form`
    display: ${props => props.show ? 'block' : 'none'};
    margin-top: 20px;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 10px;
`;

const Input = styled.input`
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const databaseId = "your_database_id"; // Define your databaseId here
    const [showCreateUserForm, setShowCreateUserForm] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await UserService.getUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleAssignUserToDatabase = async (userId, databaseId) => {
        try {
            await UserService.assignToDatabase(userId, databaseId);
            console.log('User assigned to database successfully');
        } catch (error) {
            console.error('Error assigning user to database:', error);
        }
    };

    const toggleCreateUserForm = () => {
        setShowCreateUserForm(!showCreateUserForm);
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        try {
            const newUser = {
                username: e.target.username.value,
                password: e.target.password.value,
                role: e.target.role.value
            };
            await UserService.createUser(newUser);
            fetchData();
            e.target.reset();
            setShowCreateUserForm(false);
            console.log('User created successfully');
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <Container>
            <Title>User Management</Title>
            <List>
                {users.map(user => (
                    <ListItem key={user._id}>
                        {user.username} - 
                        <Button onClick={() => handleAssignUserToDatabase(user._id, databaseId)}>Assign to Database</Button>
                    </ListItem>
                ))}
            </List>
            <Button onClick={toggleCreateUserForm}>Create User</Button>
            <Form show={showCreateUserForm} onSubmit={handleCreateUser}>
                <Label htmlFor="username">Username:</Label>
                <Input type="text" id="username" name="username" required />
                <Label htmlFor="password">Password:</Label>
                <Input type="password" id="password" name="password" required />
                <Label htmlFor="role">Role:</Label>
                <Input type="text" id="role" name="role" required />
                <Button type="submit">Create</Button>
            </Form>
        </Container>
    );
};

export default UserManagement;
