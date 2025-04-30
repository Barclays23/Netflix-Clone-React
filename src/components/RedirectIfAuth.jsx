import React from 'react'
import { Navigate } from 'react-router-dom'
import { userAuth } from '../context/AuthContext'

function RedirectIfAuth({ children }) {
   const { user, loading } = userAuth()

   if (loading) return null;

   if (user) {
      return <Navigate to="/profile" />
   }

   return children
}

export default RedirectIfAuth
