import { createAsyncThunk  } from '@reduxjs/toolkit';

import{
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
    searchJob   
} from "../../API/jobAPI.js";


//Create Job
export const createJobThunk = createAsyncThunk(
    'job/createJob',    
    async (jobData, { rejectWithValue }) => {
        try {
            const response = await createJob(jobData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Job creation failed');
        }
    }
);


//Get All Jobs
export const getAllJobsThunk = createAsyncThunk(
    'job/getAllJobs',   
    async (_, { rejectWithValue }) => {
        try {
            const response = await getAllJobs();
            return response.data.data;
        }
        catch (error) {
            return rejectWithValue(error || 'Failed to fetch jobs');
        }
    }
);


//Get Job By ID
export const getJobByIdThunk = createAsyncThunk(
    'job/getJobById',
    async (id, { rejectWithValue }) => {
        try {
            const response = await getJobById(id);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Failed to fetch job details');
        }
    }
);


//Update Job
export const updateJobThunk = createAsyncThunk(
    'job/updateJob',
    async ({ id, jobData }, { rejectWithValue }) => {
        try {
            const response = await updateJob(id, jobData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Job update failed');
        }
    }
);


//Delete Job
export const deleteJobThunk = createAsyncThunk(
    'job/deleteJob',
    async (id, { rejectWithValue }) => {
        try {
            await deleteJob(id);
            return id;
        } catch (error) {
            return rejectWithValue(error || 'Failed to delete job');
        }
    }
);


//Search Job
export const searchJobThunk = createAsyncThunk(
    'job/searchJob',
    async (query, { rejectWithValue }) => {
        try {
            const response = await searchJob(query);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Job search failed');
        }
    }
);




