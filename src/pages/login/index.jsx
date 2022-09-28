import React from 'react'
import './index.less'
// import logo from '../../assets/images/logo.webp';
import LoginForm from '../../components/Login-Form'

import $axios from '../../api/http'
/* 登录路由组件 */
export default function Login() {
  return (
    <div className='login'>
      <div className='mask'></div>
      <header className='login-header'>
        <div> 当前项目：后台管理系统</div>

        <button onClick={() => $axios('/api/login').then(console.log)}>测试</button>
      </header>
      <section className='login-content'>
        <div className='login-card'>
          <h1>用户登录</h1>
          <LoginForm />
        </div>
      </section>
    </div>
  )
}
