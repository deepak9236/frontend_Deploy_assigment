import axios from 'axios';
import { instanceRoutes } from '../utils/APIRoutes';

const API_URL = instanceRoutes;

const InstanceService = {
    addInstance: async (instanceData, token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        await axios.post(API_URL, instanceData, config);
    },
    getInstances: async (token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const response = await axios.get(API_URL, config);
        return response.data;
    },
};

export default InstanceService;
