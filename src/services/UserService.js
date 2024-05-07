import axios from 'axios';
import { userRoutes } from '../utils/APIRoutes';

const API_URL = userRoutes;

const UserService = {
    // changePassword: async (userId, newPassword) => {
    //     try {
    //         await axios.put(`${API_URL}${userId}/password`, { newPassword });
    //         console.log('Password changed successfully');
    //     } catch (error) {
    //         console.error('Error changing password:', error);
    //         throw error;
    //     }
    // },

    createUser: async (userData) => {
        try {
            console.log(userData);
            const response = await axios.post(`${API_URL}`, userData);
            console.log('User created successfully');
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    getUsers: async () => {
        try {
            const response = await axios.get(`${API_URL}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    deleteUser: async (userId) => {
        try {
            await axios.delete(`${API_URL}${userId}`);
            console.log('User deleted successfully');
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },
    assignToDatabase: async (userId, databaseId) => {
        try {
            await axios.post(`${API_URL}${userId}/assignToDatabase`, { databaseId });
            console.log('User assigned to database successfully');
        } catch (error) {
            console.error('Error assigning user to database:', error);
            throw error;
        }
    }
};

export default UserService;
