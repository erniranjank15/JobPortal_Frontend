<<<<<<< HEAD
import { createAsyncThunk  } from '@reduxjs/toolkit';
import {register,
    login,
    logout,
    getCurrentUser,
    updateProfile,
    changePassword,
    updateResume,
    getAllUsers,
    deleteUser

} from "../../API/authAPI.js";


//Register User
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {  
        try {
            const response = await register(userData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Registration failed');
        }
    }
);

//Login User
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {      
        try {
            const response = await login(userData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Login failed');
        }   
    }
);


//Logout User
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await logout();
        } catch (error) {
            return rejectWithValue(error || 'Logout failed');
        }
    }
);


//Get Current User
export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => { 
        try {
            const response = await getCurrentUser();
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Failed to fetch user');
        }
    }
);


//Update Profile
export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await updateProfile(profileData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Profile update failed');
        }   
    }
);


//Change Password
export const changeUserPassword = createAsyncThunk(
    'auth/changeUserPassword',
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await changePassword(passwordData);
            return response.data.data;
        }
        catch (error) {
            return rejectWithValue(error || 'Password change failed');
        }
    }
);


//Update Resume
export const updateUserResume = createAsyncThunk(
    'auth/updateUserResume',    
    async (resumeFile, { rejectWithValue }) => {
        try {
            const response = await updateResume(resumeFile);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Resume update failed');
        }   
    }
);


//Get All Users (Admin)
export const fetchAllUsers = createAsyncThunk(
    'auth/fetchAllUsers',   
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllUsers();
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Failed to fetch users');
        }
    }
);


//Delete User (Admin)
export const deleteUserById = createAsyncThunk(
    'auth/deleteUserById',  
    async (userId, { rejectWithValue }) => {
        try {
            await deleteUser(userId);   
            return userId;
        } catch (error) {
            return rejectWithValue(error || 'Failed to delete user');
        }
    }
);






=======
import { createAsyncThunk  } from '@reduxjs/toolkit';
import {register,
    login,
    logout,
    getCurrentUser,
    updateProfile,
    changePassword,
    updateResume,
    getAllUsers,
    deleteUser

} from "../../API/authAPI.js";


//Register User
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, { rejectWithValue }) => {  
        try {
            const response = await register(userData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Registration failed');
        }
    }
);

//Login User
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (userData, { rejectWithValue }) => {      
        try {
            const response = await login(userData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Login failed');
        }   
    }
);

//Logout User
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, { rejectWithValue }) => {
        try {
            await logout();
        } catch (error) {
            return rejectWithValue(error || 'Logout failed');
        }
    }
);


//Get Current User
export const fetchCurrentUser = createAsyncThunk(
    'auth/fetchCurrentUser',
    async (_, { rejectWithValue }) => { 
        try {
            const response = await getCurrentUser();
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Failed to fetch user');
        }
    }
);


//Update Profile
export const updateUserProfile = createAsyncThunk(
    'auth/updateUserProfile',
    async (profileData, { rejectWithValue }) => {
        try {
            const response = await updateProfile(profileData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Profile update failed');
        }   
    }
);


//Change Password
export const changeUserPassword = createAsyncThunk(
    'auth/changeUserPassword',
    async (passwordData, { rejectWithValue }) => {
        try {
            const response = await changePassword(passwordData);
            return response.data.data;
        }
        catch (error) {
            return rejectWithValue(error || 'Password change failed');
        }
    }
);


//Update Resume
export const updateUserResume = createAsyncThunk(
    'auth/updateUserResume',    
    async (resumeFile, { rejectWithValue }) => {
        try {
            const response = await updateResume(resumeFile);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Resume update failed');
        }   
    }
);


//Get All Users (Admin)
export const fetchAllUsers = createAsyncThunk(
    'auth/fetchAllUsers',   
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllUsers();
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Failed to fetch users');
        }
    }
);


//Delete User (Admin)
export const deleteUserById = createAsyncThunk(
    'auth/deleteUserById',  
    async (userId, { rejectWithValue }) => {
        try {
            await deleteUser(userId);   
            return userId;
        } catch (error) {
            return rejectWithValue(error || 'Failed to delete user');
        }
    }
);






>>>>>>> 1f3bf29 (updated)
