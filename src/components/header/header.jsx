import React,{ useEffect,useState } from 'react'
import './index.less';
import { Row,Col } from 'antd';
import { useStore } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logout } from '@/redux/slices/login-slice.js';
import { removeUser } from '@/utils/storageUtil.js';
import $axios from '@/api/http.js';
export default function Header() {
  const { dispatch,getState } = useStore()
  const { name } = getState().loginReducer.data
  const url = '/api/weather/city/101030100'
  const [weather,setWeather] = useState('未知')
  const time = new Date().toLocaleString()
  function handleLogout() {
    removeUser()
    dispatch(logout())
  }
  useEffect(() => {
    $axios(url).then(({ data }) => {

      setWeather(data.forecast[0])
    })
  },[])

  return (
    <div className='header' style={{ lineHeight: '50px' }}>
      <Row justify='end'>
        <Col>
          <span>欢迎 {name} </span>
          <NavLink style={{ color: 'blue' }} onClick={handleLogout} to='/login'>退出</NavLink>
        </Col>
      </Row>
      <hr />
      <Row justify='space-between'>
        <Col className='head-bottom-le'>首页</Col>
        <Col className='head-bottom-ri' >
          <span>{time}</span>
          <span>{weather.type}</span>
          <span>{weather.notice}</span>
        </Col>
      </Row>
    </div>
  )
}
