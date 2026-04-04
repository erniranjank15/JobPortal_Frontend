<<<<<<< HEAD
import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
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
=======
import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true,
});

// Global error handling
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
>>>>>>> 1f3bf29 (updated)
