import React,{ Fragment } from 'react'
import { useRoutes } from 'react-router-dom';

// import { Button,notification } from 'antd';
import routeRules from './routes/';
export default function App() {

  return (
    <Fragment>
      {useRoutes(routeRules)}
    </Fragment>
  )
}
