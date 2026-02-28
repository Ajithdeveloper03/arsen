import axios from 'axios';

// For Hostinger, change this to your domain e.g., 'https://yourdomain.com'
// Or use an environment variable: import.meta.env.VITE_API_BASE_URL
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://arseninterior.in';
const API_URL = `${BASE_URL}/api`;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('admin_token');
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

export default api;
