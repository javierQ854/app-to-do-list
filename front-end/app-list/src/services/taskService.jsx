import axisos from 'axios';
const API_URL = 'https://proyects.sytes.net/api';
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}
export const getTasks = async (userId) => await axisos.get(`${API_URL}/task/${userId}`, getAuthHeaders());
export const createTask = async (taskData) => await axisos.post(`${API_URL}/task`, taskData, getAuthHeaders());
export const updateTask = async (id, taskData) => await axisos.put(`${API_URL}/task/${id}`, taskData, getAuthHeaders());
export const deleteTask = async (id) => await axisos.delete(`${API_URL}/task/${id}`, getAuthHeaders());