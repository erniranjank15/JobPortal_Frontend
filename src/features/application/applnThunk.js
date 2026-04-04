import { createAsyncThunk  } from '@reduxjs/toolkit';
import{
    applyForJob,
    getMyApplications,
    getApplicationsForJob,
    updateApplicationStatus
} from "../../API/applicationAPI.js";


//Apply for Job
export const applyForJobThunk = createAsyncThunk(
    'application/applyForJob',
    async ({ jobId, applicationData }, { rejectWithValue }) => {
        try {
            const response = await applyForJob(jobId, applicationData);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Application failed');
        }
    }
);  



//Get My Applications
export const getMyApplicationsThunk = createAsyncThunk(
    'application/getMyApplications',
    async (_, { rejectWithValue }) => {
        try {
            const response = await getMyApplications();
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Failed to get applications');
        }
    }
);



//Get Applications for a Job (Recruiter)
export const getApplicationsForJobThunk = createAsyncThunk(
    'application/getApplicationsForJob',
    async (jobId, { rejectWithValue }) => {
        try {
            const response = await getApplicationsForJob(jobId);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Failed to get applications for this job');
        }
    }
);


//Update Application Status (Recruiter)
export const updateApplicationStatusThunk = createAsyncThunk(
    'application/updateApplicationStatus',  
    async ({ applicationId, status }, { rejectWithValue }) => {
        try {
            const response = await updateApplicationStatus(applicationId, status);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error || 'Failed to update application status');
        }
    }
);


