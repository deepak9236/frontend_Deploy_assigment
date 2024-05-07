import axios from 'axios';
import { authRoutes } from '../utils/APIRoutes';

const API_URL = authRoutes;

const AuthService = {
    login: async (username, password) => {
        const response = await axios.post(API_URL + 'login', { username, password });
        return response.data.token;
    },
    signup: async (username, password) => {
        console.log(API_URL + 'register');
        await axios.post(API_URL + 'register', { username, password });
    },
};

export default AuthService;
