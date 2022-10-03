import React,{ useEffect,useState } from 'react'
import './index.less';
import { Row,Col,Button,Avatar } from 'antd';
import { useStore } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { logout } from '@/redux/slices/login-slice.js';
import { removeUser } from '@/utils/storageUtil.js';
import $axios from '@/api/http.js';
export default function Header() {
  const { dispatch,getState } = useStore()
  const { name,picUrl } = getState().loginReducer.data
  const url = '/api/weather/city/101030100'
  const [weather,setWeather] = useState('未知')
  const title = useLocation().state?.label || '首页'
  let time = new Date().toLocaleString()
  function handleLogout() {
    if (window.confirm('确定要退出登录吗？')) {
      removeUser()
      dispatch(logout())
    }
  }
  function getWeather() {
    $axios(url).then(({ data }) => {
      setWeather(data.forecast[0])
    })
  }
  useEffect(() => {
    getWeather()
  },[])
  return (
    <div className='header' style={{ lineHeight: '50px' }}>
      <Row justify='end' gutter={10}>
        <Col><span>{name}</span></Col>
        <Col>
          <Avatar src={picUrl}></Avatar>
        </Col>
        <Col>
          <Button type='link' onClick={handleLogout}>退出</Button>
        </Col>

      </Row>
      <hr />
      <Row justify='space-between'>
        <Col className='head-bottom-le'>{title}</Col>
        <Col className='head-bottom-ri' >
          <span>{time}</span>
          <span>{weather.type}</span>
          <span>{weather.week}</span>
        </Col>
      </Row>
    </div>
  )
}
