import { createAsyncThunk } from '@reduxjs/toolkit';
import { register, login, logout, getCurrentUser, updateProfile, changePassword, updateResume, getAllUsers, deleteUser } from "../../API/authAPI.js";

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, { rejectWithValue }) => {
    try { return (await register(userData)).data.data; }
    catch (error) { return rejectWithValue(error || 'Registration failed'); }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, { rejectWithValue }) => {
    try { return (await login(userData)).data.data; }
    catch (error) { return rejectWithValue(error || 'Login failed'); }
});

export const logoutUser = createAsyncThunk('auth/logoutUser', async (_, { rejectWithValue }) => {
    try { await logout(); }
    catch (error) { return rejectWithValue(error || 'Logout failed'); }
});

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, { rejectWithValue }) => {
    try { return (await getCurrentUser()).data.data; }
    catch (error) { return rejectWithValue(error || 'Failed to fetch user'); }
});

export const updateUserProfile = createAsyncThunk('auth/updateUserProfile', async (profileData, { rejectWithValue }) => {
    try { return (await updateProfile(profileData)).data.data; }
    catch (error) { return rejectWithValue(error || 'Profile update failed'); }
});

export const changeUserPassword = createAsyncThunk('auth/changeUserPassword', async (passwordData, { rejectWithValue }) => {
    try { return (await changePassword(passwordData)).data.data; }
    catch (error) { return rejectWithValue(error || 'Password change failed'); }
});

export const updateUserResume = createAsyncThunk('auth/updateUserResume', async (resumeFile, { rejectWithValue }) => {
    try { return (await updateResume(resumeFile)).data.data; }
    catch (error) { return rejectWithValue(error || 'Resume update failed'); }
});

export const fetchAllUsers = createAsyncThunk('auth/fetchAllUsers', async (_, { rejectWithValue }) => {
    try { return (await getAllUsers()).data.data; }
    catch (error) { return rejectWithValue(error || 'Failed to fetch users'); }
});

export const deleteUserById = createAsyncThunk('auth/deleteUserById', async (userId, { rejectWithValue }) => {
    try { await deleteUser(userId); return userId; }
    catch (error) { return rejectWithValue(error || 'Failed to delete user'); }
});
