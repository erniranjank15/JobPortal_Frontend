import { createAsyncThunk } from '@reduxjs/toolkit';
import { applyForJob, getMyApplications, getApplicationsForJob, updateApplicationStatus } from "../../API/applicationAPI.js";

export const applyForJobThunk = createAsyncThunk('application/applyForJob', async ({ jobId, applicationData }, { rejectWithValue }) => {
    try { return (await applyForJob(jobId, applicationData)).data.data; }
    catch (error) { return rejectWithValue(error || 'Application failed'); }
});

export const getMyApplicationsThunk = createAsyncThunk('application/getMyApplications', async (_, { rejectWithValue }) => {
    try { return (await getMyApplications()).data.data; }
    catch (error) { return rejectWithValue(error || 'Failed to get applications'); }
});

export const getApplicationsForJobThunk = createAsyncThunk('application/getApplicationsForJob', async (jobId, { rejectWithValue }) => {
    try { return (await getApplicationsForJob(jobId)).data.data; }
    catch (error) { return rejectWithValue(error || 'Failed to get applications for this job'); }
});

export const updateApplicationStatusThunk = createAsyncThunk('application/updateApplicationStatus', async ({ applicationId, status }, { rejectWithValue }) => {
    try { return (await updateApplicationStatus(applicationId, status)).data.data; }
    catch (error) { return rejectWithValue(error || 'Failed to update application status'); }
});
