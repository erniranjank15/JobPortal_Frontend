import API from '../services/axios';

export const register = async (userData) => API.post('/users/register', userData, {
    headers: { 'Content-Type': 'multipart/form-data' }
});

export const login = async (userData) => API.post('/users/login', userData);

export const logout = async () => API.get('/users/logout');

export const getCurrentUser = async () => API.get('/users/me');

export const updateProfile = async (profileData) => API.put('/users/update-profile', profileData);

export const changePassword = async (passwordData) => API.put('/users/change-password', passwordData);

export const updateResume = async (resumeFile) => API.patch('/users/update-resume', resumeFile);

export const getAllUsers = async () => API.get('/users/all-users');

export const deleteUser = async (userId) => API.delete(`/users/delete-user/${userId}`);



