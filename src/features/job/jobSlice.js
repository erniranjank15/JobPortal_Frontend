<<<<<<< HEAD
import {createSlice } from '@reduxjs/toolkit';
import {createJobThunk,
    getAllJobsThunk,
    getJobByIdThunk,
    updateJobThunk,
    deleteJobThunk,
    searchJobThunk} from './jobThunk';


//Initial State

const initialState = {
    jobs: [],
    jobDetails: null,
    loading: false,
    error: null,
};


const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
    builder

        //Create Job
        .addCase(createJobThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createJobThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.jobs.push(action.payload);
        })
        .addCase(createJobThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        //Get All Jobs
        .addCase(getAllJobsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllJobsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.jobs = action.payload;
        })
        .addCase(getAllJobsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        //Get Job By ID
        .addCase(getJobByIdThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getJobByIdThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.jobDetails = action.payload;
        })
        .addCase(getJobByIdThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        //Update Job
        .addCase(updateJobThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateJobThunk.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.jobs.findIndex(job => job.id === action.payload.id);
            if (index !== -1) {
                state.jobs[index] = action.payload;
            }
        })
        .addCase(updateJobThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        //Delete Job
        .addCase(deleteJobThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteJobThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.jobs = state.jobs.filter(job => job.id !== action.payload.id);
        })
        .addCase(deleteJobThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        //Search Job
        .addCase(searchJobThunk.pending, (state) => {
            state.loading = true;   
            state.error = null;
        })
        .addCase(searchJobThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.jobs = action.payload;
        })
        .addCase(searchJobThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

    
    }

});

export default jobSlice.reducer;

=======
import {createSlice } from '@reduxjs/toolkit';
import {createJobThunk,
    getAllJobsThunk,
    getJobByIdThunk,
    updateJobThunk,
    deleteJobThunk,
    searchJobThunk} from './jobThunk';


//Initial State

const initialState = {
    jobs: [],
    jobDetails: null,
    loading: false,
    error: null,
};


const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
    builder

        //Create Job
        .addCase(createJobThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createJobThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.jobs.push(action.payload);
        })
        .addCase(createJobThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        //Get All Jobs
        .addCase(getAllJobsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllJobsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.jobs = action.payload;
        })
        .addCase(getAllJobsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        //Get Job By ID
        .addCase(getJobByIdThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getJobByIdThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.jobDetails = action.payload;
        })
        .addCase(getJobByIdThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        //Update Job
        .addCase(updateJobThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateJobThunk.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.jobs.findIndex(job => job.id === action.payload.id);
            if (index !== -1) {
                state.jobs[index] = action.payload;
            }
        })
        .addCase(updateJobThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        //Delete Job
        .addCase(deleteJobThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteJobThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.jobs = state.jobs.filter(job => job.id !== action.payload.id);
        })
        .addCase(deleteJobThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        //Search Job
        .addCase(searchJobThunk.pending, (state) => {
            state.loading = true;   
            state.error = null;
        })
        .addCase(searchJobThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.jobs = action.payload;
        })
        .addCase(searchJobThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

    
    }

});

export default jobSlice.reducer;

>>>>>>> 1f3bf29 (updated)
