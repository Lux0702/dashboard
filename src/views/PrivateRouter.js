// PrivateRoute.js
import React from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PrivateRoute = () => {
  const user = localStorage.getItem('userInfo')
  console.log('private là:', user)
  const navigate = useNavigate()
  const token = JSON.parse(user)
  if (!token) {
    setTimeout(() => {
      alert('Vui lòng đăng nhập')
    }, 1000)
    const redirectPath = '/login'
    return <Navigate to={redirectPath} />
  }
}
export default PrivateRoute
