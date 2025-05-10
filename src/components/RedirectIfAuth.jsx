import React from 'react'
import { Navigate } from 'react-router-dom'
import { userAuth } from '../context/AuthContext'
import Spinner1 from './Spinner1';





function RedirectIfAuth({ children }) {
   const { user, loading } = userAuth()
   

   if (user) {
      return <Navigate to="/" />  // redirect to home page after login
   }

   return children
}

export default RedirectIfAuth
