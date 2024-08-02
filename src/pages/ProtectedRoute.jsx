import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({children}) {
    const navigate = useNavigate()
    const { authenticated } = useAuth()
    useEffect(() => {
        if(!authenticated) navigate('/login', {replace: true})
    }, [authenticated, navigate])
  return (
    children
  )
}
