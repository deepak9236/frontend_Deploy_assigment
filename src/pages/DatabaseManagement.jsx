import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatabaseService from '../services/DatabaseService';

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

const DeleteButton = styled.button`
    background-color: #ff4d4f;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #f5222d;
    }
`;

const Form = styled.form`
    margin-top: 20px;
`;

const Input = styled.input`
    padding: 5px;
    margin-right: 10px;
`;

const SubmitButton = styled.button`
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: #0056b3;
    }
`;

const DatabaseManagement = () => {
    const [databases, setDatabases] = useState([]);
    const [newDatabaseName, setNewDatabaseName] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data = await DatabaseService.getDatabases();
            setDatabases(data);
        } catch (error) {
            console.error('Error fetching databases:', error);
        }
    };

    const handleDeleteDatabase = async (id) => {
        try {
            await DatabaseService.deleteDatabase(id);
            setDatabases(databases.filter(database => database._id !== id));
        } catch (error) {
            console.error('Error deleting database:', error);
        }
    };

    const handleAddDatabase = async (e) => {
        e.preventDefault();
        try {
            const newDatabase = await DatabaseService.addDatabase({ name: newDatabaseName });
            setDatabases([...databases, newDatabase]);
            setNewDatabaseName('');
        } catch (error) {
            console.error('Error adding database:', error);
        }
    };

    return (
        <Container>
            <Title>Database Management</Title>
            <List>
                {databases.map(database => (
                    <ListItem key={database._id}>
                        {database.name} - <DeleteButton onClick={() => handleDeleteDatabase(database._id)}>Delete</DeleteButton>
                    </ListItem>
                ))}
            </List>
            <Form onSubmit={handleAddDatabase}>
                <Input
                    type="text"
                    value={newDatabaseName}
                    onChange={(e) => setNewDatabaseName(e.target.value)}
                    placeholder="Enter database name"
                    required
                />
                <SubmitButton type="submit">Add Database</SubmitButton>
            </Form>
        </Container>
    );
};

export default DatabaseManagement;
