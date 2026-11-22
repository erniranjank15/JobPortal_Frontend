import React from "react";  
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

const ProtectedRoute = ({children , role})=>{
    const { user, loading } = useSelector((state) => state.auth);

    // If still verifying authentication session on refresh, show loading
    if (loading && !user) {
        return <Loading />;
    }

    // Not logged in
    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    // Role based protection
    if (role && user.role !== role) {
        return <Navigate to="/" replace/>;
    }

    return children;
}

export default ProtectedRoute;