/** 边栏导航 */

import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { useNavigate,useLocation } from 'react-router-dom';
import { setTitle } from '@/redux/slices/header-title-slice.js';
import './index.less';
import { Button,Menu } from 'antd';
import {
  RightOutlined,
  LeftOutlined,
} from '@ant-design/icons';
import { items,key_label_map } from './nav-options'


//根据当前路径;找到 当前选中项 
function getKeys(items,pathname) {
  const selectedKey = [],
    openKey = getOpenKey(items)?.key


  function getOpenKey(items) {
    return items.find(item => {
      const { children,key } = item
      return children ? getOpenKey(children) :
        pathname.split('/').includes(key) ? !!selectedKey.push(key) : false
    })
  }
  return { selectedKey,openKey }
}


export default function LeftNav(props) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { toggleCollapsed,collapsed } = props
  const fontSize = collapsed ? '14px' : '26px'
  const { selectedKey,openKey } = getKeys(items,pathname)
  const dispatch = useDispatch()
  const userMenus = useSelector(state => state.loginReducer.data.menus)
  // let userMenus = ['home','role','pie-chart','product-manage']
  const menus = items || (function _f(items) {
    return items.filter(v => {
      const { key,children } = v
      debugger
      if (children) v.children = children.filter(v => userMenus.includes(v.key))
      return children ? _f(children) : userMenus.includes(key)
    })
  })(items)



  // 点击导航跳转
  function handleNavigation({ key }) {
    const { label } = key_label_map.find(v => v.key === key)
    navigate(key)
    dispatch(setTitle(label))

  }
  return (
    <div className='sider'>
      <h1 className='title' style={{ fontSize }}>后台管理 </h1>
      <Menu
        selectedKeys={selectedKey}
        defaultOpenKeys={[openKey]}
        mode="inline"
        onClick={handleNavigation}
        theme="dark"
        items={menus}
      />
      <Button type='link' style={{ backgroundColor: '#0f2640' }}
        onClick={toggleCollapsed}
        block>
        {collapsed ? <RightOutlined title='展开' /> : <LeftOutlined title='收起' />}
      </Button>

    </div>
  )
}


