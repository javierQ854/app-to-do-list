import axios from 'axios';

const API_URL = 'https://proyects.sytes.net/api';

export const register = (data) => axios.post(`${API_URL}/register`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
    