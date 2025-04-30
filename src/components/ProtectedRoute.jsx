import React from 'react'
import { userAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
    const { user, loading } = userAuth();

    if (loading) return null;

    if (!user) {
        return <Navigate to="/" />;
    }

    return children
}

export default ProtectedRoute