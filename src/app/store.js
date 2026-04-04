<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import jobReducer from "../features/job/jobSlice.js";
import applicationReducer from "../features/application/applnSlice.js";



const store = configureStore({
    reducer:{
        auth:authReducer,
        job:jobReducer,
        application:applicationReducer,
     }
    
});


=======
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice.js";
import jobReducer from "../features/job/jobSlice.js";
import applicationReducer from "../features/application/applnSlice.js";



const store = configureStore({
    reducer:{
        auth:authReducer,
        job:jobReducer,
        application:applicationReducer,
     }
    
});


>>>>>>> 1f3bf29 (updated)
export default store;