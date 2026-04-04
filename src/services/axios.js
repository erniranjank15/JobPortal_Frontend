import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    withCredentials: true,
});

// Global error handling (INTERCEPTOR)
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