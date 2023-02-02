import { useState } from "preact/hooks";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RequireAuth({children}){
    const auth = useAuth();
    const location  = useLocation();
    
    if(!auth?.authUser){
        return <Navigate to="/login" state={{path: location.pathname}}></Navigate>
    }
    return children
}