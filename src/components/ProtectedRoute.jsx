import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hook/useAuth'



const ProtectedRoute = ({children}) => {

  const {user, loading} = useAuth()

  if(loading) `Loading`

  if(!user) return <Navigate to="/login"/>

  return <>{children}</>
}

export default ProtectedRoute