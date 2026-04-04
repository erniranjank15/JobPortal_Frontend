<<<<<<< HEAD
import React from "react";  
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



const ProtectedRoute = ({children , role})=>{
    const {user} = useSelector((state)=>state.auth);

    //Not logged in

    if(!user){
        return <Navigate to="/login" replace/>
    }

    //Role based protection

    if(role && user.role !== role){
        return <Navigate to="/" replace/>
    }

    return children;

}

=======
import React from "react";  
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



const ProtectedRoute = ({children , role})=>{
    const {user} = useSelector((state)=>state.auth);

    //Not logged in

    if(!user){
        return <Navigate to="/login" replace/>
    }

    //Role based protection

    if(role && user.role !== role){
        return <Navigate to="/" replace/>
    }

    return children;

}

>>>>>>> 1f3bf29 (updated)
export default ProtectedRoute;