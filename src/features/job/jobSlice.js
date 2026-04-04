import { createSlice } from '@reduxjs/toolkit';
import { createJobThunk, getAllJobsThunk, getJobByIdThunk, updateJobThunk, deleteJobThunk, searchJobThunk } from './jobThunk';

const initialState = { jobs: [], jobDetails: null, loading: false, error: null };

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createJobThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(createJobThunk.fulfilled, (state, action) => { state.loading = false; state.jobs.push(action.payload); })
            .addCase(createJobThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(getAllJobsThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(getAllJobsThunk.fulfilled, (state, action) => { state.loading = false; state.jobs = action.payload; })
            .addCase(getAllJobsThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(getJobByIdThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(getJobByIdThunk.fulfilled, (state, action) => { state.loading = false; state.jobDetails = action.payload; })
            .addCase(getJobByIdThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(updateJobThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(updateJobThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.jobs.findIndex(job => job._id === action.payload?._id);
                if (index !== -1) state.jobs[index] = action.payload;
            })
            .addCase(updateJobThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(deleteJobThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(deleteJobThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.jobs = state.jobs.filter(job => job._id !== action.payload);
            })
            .addCase(deleteJobThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(searchJobThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(searchJobThunk.fulfilled, (state, action) => { state.loading = false; state.jobs = action.payload; })
            .addCase(searchJobThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    }
});

export default jobSlice.reducer;
