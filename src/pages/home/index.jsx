import React from 'react'
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
/* 管理路由组件 */

export default function Home() {
  const isLogin = useSelector(({ loginReducer }) => loginReducer.value)
  if (!isLogin) return <Navigate to='/login' replace />
  return (
    <div>Home</div>
  )
}
