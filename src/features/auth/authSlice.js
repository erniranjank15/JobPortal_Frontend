<<<<<<< HEAD
import {createSlice } from '@reduxjs/toolkit';
import {registerUser,
    loginUser,
    logoutUser,
    fetchCurrentUser,
    updateUserProfile,
    changeUserPassword,
    updateUserResume,
    fetchAllUsers,
    deleteUserById

} from "./authThunk.js";


//Initial State

const initialState = {
    user: null,
    loading: false,
    error: null,
    allUsers: [] , 
    isAuthenticated: false,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
    builder
        //Register User
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
            // don't set user here — redirect to login to get token via cookie
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })  

        //Login User
        .addCase(loginUser.pending, (state) => {
            state.loading = true;   
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //Logout User
        .addCase(logoutUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //Get Current User
        .addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(fetchCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //Update Profile
        .addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    

    //Change Password
     .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(changeUserPassword.fulfilled, (state) => {
        state.loading = false;
    })
    .addCase(changeUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;   
    })

    //Update Resume
    .addCase(updateUserResume.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(updateUserResume.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user && action.payload?.resume) {
            state.user.resume = action.payload.resume; // Assuming response contains updated resume
        }
    })
    .addCase(updateUserResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    
    })


    //Fetch All Users (Admin)
    .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
    })
    .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })

    
    //Delete User (Admin)
    .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = state.allUsers.filter(user => user.id !== action.payload.id);
    })
    .addCase(deleteUserById.rejected, (
        state, action) => {
        state.loading = false;
        state.error = action.payload;
    })  

}

});

export default authSlice.reducer;   

































=======
import {createSlice } from '@reduxjs/toolkit';
import {registerUser,
    loginUser,
    logoutUser,
    fetchCurrentUser,
    updateUserProfile,
    changeUserPassword,
    updateUserResume,
    fetchAllUsers,
    deleteUserById

} from "./authThunk.js";


//Initial State

const initialState = {
    user: null,
    loading: false,
    error: null,
    allUsers: [] , 
    isAuthenticated: false,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
    builder
        //Register User
        .addCase(registerUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.loading = false;
            // don't set user here — redirect to login to get token via cookie
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })  

        //Login User
        .addCase(loginUser.pending, (state) => {
            state.loading = true;   
            state.error = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            const { token, ...user } = action.payload || {};
            state.user = user;
            state.isAuthenticated = true;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //Logout User
        .addCase(logoutUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(logoutUser.fulfilled, (state) => {
            state.loading = false;
            state.user = null;
            state.isAuthenticated = false;
        })
        .addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //Get Current User
        .addCase(fetchCurrentUser.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(fetchCurrentUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        //Update Profile
        .addCase(updateUserProfile.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        })
        .addCase(updateUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    

    //Change Password
     .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(changeUserPassword.fulfilled, (state) => {
        state.loading = false;
    })
    .addCase(changeUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;   
    })

    //Update Resume
    .addCase(updateUserResume.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(updateUserResume.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user && action.payload?.resume) {
            state.user.resume = action.payload.resume; // Assuming response contains updated resume
        }
    })
    .addCase(updateUserResume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    
    })


    //Fetch All Users (Admin)
    .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = action.payload;
    })
    .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
    })

    
    //Delete User (Admin)
    .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(deleteUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.allUsers = state.allUsers.filter(user => user.id !== action.payload.id);
    })
    .addCase(deleteUserById.rejected, (
        state, action) => {
        state.loading = false;
        state.error = action.payload;
    })  

}

});

export default authSlice.reducer;   

































>>>>>>> 1f3bf29 (updated)
