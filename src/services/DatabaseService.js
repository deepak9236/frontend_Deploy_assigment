import axios from 'axios';
import { databaseRoutes } from '../utils/APIRoutes';

const API_URL = databaseRoutes;

const DatabaseService = {
    addDatabase: async (databaseData) => {
        await axios.post(API_URL, databaseData);
    },
    getDatabases: async () => {
        const response = await axios.get(API_URL);
        return response.data;
    },
    deleteDatabase: async (id) => {
        await axios.delete(`${API_URL}${id}`);
    },
};

export default DatabaseService;
