import { createSlice } from '@reduxjs/toolkit';
import { applyForJobThunk, getMyApplicationsThunk, getApplicationsForJobThunk, updateApplicationStatusThunk } from "./applnThunk.js";

const initialState = { applications: [], loading: false, error: null };

const applicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(applyForJobThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(applyForJobThunk.fulfilled, (state, action) => { state.loading = false; state.applications.push(action.payload); })
            .addCase(applyForJobThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(getMyApplicationsThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(getMyApplicationsThunk.fulfilled, (state, action) => { state.loading = false; state.applications = action.payload; })
            .addCase(getMyApplicationsThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(getApplicationsForJobThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(getApplicationsForJobThunk.fulfilled, (state, action) => { state.loading = false; state.applications = action.payload; })
            .addCase(getApplicationsForJobThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(updateApplicationStatusThunk.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(updateApplicationStatusThunk.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.applications.findIndex(app => app._id === action.payload?._id);
                if (index !== -1) state.applications[index] = action.payload;
            })
            .addCase(updateApplicationStatusThunk.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
    }
});

export default applicationSlice.reducer;
