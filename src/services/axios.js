import axios from 'axios';

// In development, route through Vite proxy (/api/v1) to prevent CORS issues on localhost.
// In production, use VITE_API_BASE_URL (defaults to deployed Render API).
const baseURL = import.meta.env.DEV
    ? '/api/v1'
    : (import.meta.env.VITE_API_BASE_URL || 'https://job-portal-bzx9.onrender.com/api/v1');

const API = axios.create({
    baseURL,
    withCredentials: true,
});

API.interceptors.response.use(
    (res) => res,
    (error) => {
        const message =
            error?.response?.data?.message ||
            error?.response?.data?.error ||
            error?.message ||
            "Something went wrong";
        return Promise.reject(message);
    }
);

export default API;
