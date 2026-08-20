import { createSlice } from '@reduxjs/toolkit';
import { registerUser, loginUser, logoutUser, fetchCurrentUser, updateUserProfile, changeUserPassword, updateUserResume, fetchAllUsers, deleteUserById, forgotPasswordUser, resetPasswordUser } from "./authThunk.js";

const initialState = { user: null, loading: false, error: null, allUsers: [], isAuthenticated: false, forgotPasswordLoading: false, forgotPasswordError: null, resetPasswordLoading: false, resetPasswordError: null };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearForgotPasswordError: (state) => { state.forgotPasswordError = null; },
        clearResetPasswordError: (state) => { state.resetPasswordError = null; }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(registerUser.fulfilled, (state) => { state.loading = false; })
            .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(logoutUser.pending, (state) => { state.loading = true; })
            .addCase(logoutUser.fulfilled, (state) => { state.loading = false; state.user = null; state.isAuthenticated = false; })
            .addCase(logoutUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(fetchCurrentUser.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
            .addCase(fetchCurrentUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(updateUserProfile.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(updateUserProfile.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
            .addCase(updateUserProfile.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(changeUserPassword.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(changeUserPassword.fulfilled, (state) => { state.loading = false; })
            .addCase(changeUserPassword.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(updateUserResume.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(updateUserResume.fulfilled, (state, action) => {
                state.loading = false;
                if (state.user && action.payload?.resume) state.user.resume = action.payload.resume;
            })
            .addCase(updateUserResume.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(fetchAllUsers.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(fetchAllUsers.fulfilled, (state, action) => { state.loading = false; state.allUsers = action.payload; })
            .addCase(fetchAllUsers.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            .addCase(deleteUserById.pending, (state) => { state.loading = true; state.error = null; })
            .addCase(deleteUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.allUsers = state.allUsers.filter(u => u._id !== action.payload);
                if (state.user && state.user._id === action.payload) {
                    state.user = null;
                    state.isAuthenticated = false;
                }
            })
            .addCase(deleteUserById.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

            // Forgot Password
            .addCase(forgotPasswordUser.pending, (state) => { state.forgotPasswordLoading = true; state.forgotPasswordError = null; })
            .addCase(forgotPasswordUser.fulfilled, (state) => { state.forgotPasswordLoading = false; })
            .addCase(forgotPasswordUser.rejected, (state, action) => { state.forgotPasswordLoading = false; state.forgotPasswordError = action.payload; })

            // Reset Password
            .addCase(resetPasswordUser.pending, (state) => { state.resetPasswordLoading = true; state.resetPasswordError = null; })
            .addCase(resetPasswordUser.fulfilled, (state) => { state.resetPasswordLoading = false; })
            .addCase(resetPasswordUser.rejected, (state, action) => { state.resetPasswordLoading = false; state.resetPasswordError = action.payload; });
    }
});

export const { clearForgotPasswordError, clearResetPasswordError } = authSlice.actions;
export default authSlice.reducer;
