import axisos from 'axios';
const API_URL = 'http://localhost:300/api';
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
}
export const getTasks = async () => await axisos.get(`${API_URL}/tasks`, getAuthHeaders());
export const createTask = async (taskData) => await axisos.post(`${API_URL}/tasks`, taskData, getAuthHeaders());
export const updateTask = async (id, taskData) => await axisos.put(`${API_URL}/tasks/${id}`, taskData, getAuthHeaders());
export const deleteTask = async (id) => await axisos.delete(`${API_URL}/tasks/${id}`, getAuthHeaders());