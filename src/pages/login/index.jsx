import React,{ useEffect } from 'react'
import './index.less'
import LoginForm from '@/components/login-form/Login-Form.jsx'
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import $axios from '../../api/http';
import { saveUser } from '@/utils/storageUtil.js';
import { useDispatch,useSelector } from 'react-redux'
import { login } from '@/redux/slices/login-slice.js';
/* 登录路由组件 */
export default function Login() {

  const { isLogin } = useSelector(({ loginReducer }) => loginReducer)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // 若登录信息，跳转到主页
  useEffect(() => {
    if (isLogin) navigate('/home')
  })
  // 登录处理函数
  const handleSubmit = async (values) => {
    const { status,msg,data } = await $axios('/api/login')
    if (status === 0) return message.error('登录失败')
    dispatch(login(data))   //修改redux中的登录状态为true
    message.success(msg)
    navigate('/home',{ replace: true })
    saveUser(data)      //登录信息存储到 localStorage
  }



  return (
    <div className='login'>
      <div className='mask'></div>
      <header className='login-header' >
        <div> 当前项目：后台管理系统</div>
        <span>---- {isLogin ? 'true' : 'false'}</span>
      </header>
      <section className='login-content'>
        <div className='login-card'>
          <h1>用户登录</h1>
          <LoginForm onSubmit={handleSubmit} />
        </div>
      </section >
    </div >
  )
}
