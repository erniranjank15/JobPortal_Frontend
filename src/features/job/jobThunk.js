import { createAsyncThunk } from '@reduxjs/toolkit';
import { createJob, getAllJobs, getJobById, updateJob, deleteJob, searchJob } from "../../API/jobAPI.js";

export const createJobThunk = createAsyncThunk('job/createJob', async (jobData, { rejectWithValue }) => {
    try { return (await createJob(jobData)).data.data; }
    catch (error) { return rejectWithValue(error || 'Job creation failed'); }
});

export const getAllJobsThunk = createAsyncThunk('job/getAllJobs', async (_, { rejectWithValue }) => {
    try { return (await getAllJobs()).data.data; }
    catch (error) { return rejectWithValue(error || 'Failed to fetch jobs'); }
});

export const getJobByIdThunk = createAsyncThunk('job/getJobById', async (id, { rejectWithValue }) => {
    try { return (await getJobById(id)).data.data; }
    catch (error) { return rejectWithValue(error || 'Failed to fetch job details'); }
});

export const updateJobThunk = createAsyncThunk('job/updateJob', async ({ id, jobData }, { rejectWithValue }) => {
    try { return (await updateJob(id, jobData)).data.data; }
    catch (error) { return rejectWithValue(error || 'Job update failed'); }
});

export const deleteJobThunk = createAsyncThunk('job/deleteJob', async (id, { rejectWithValue }) => {
    try { await deleteJob(id); return id; }
    catch (error) { return rejectWithValue(error || 'Failed to delete job'); }
});

export const searchJobThunk = createAsyncThunk('job/searchJob', async (query, { rejectWithValue }) => {
    try { return (await searchJob(query)).data.data; }
    catch (error) { return rejectWithValue(error || 'Job search failed'); }
});
