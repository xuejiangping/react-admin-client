import React,{ useEffect } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import './index.less';
import { Button,Menu } from 'antd';
import {
  RightOutlined,
  LeftOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MailOutlined,
  BarChartOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  LineChartOutlined
} from '@ant-design/icons';


//#region 该数据映射边栏导航菜单结构
function getItem(label,key,icon,children,type) {
  return { key,icon,children,label,type };
}
const items = [
  getItem('首页','home',<HomeOutlined />),
  getItem('商品','product',<ShoppingCartOutlined />,
    [getItem('品类管理','category-manage'),
    getItem('商品管理','product-manage')]),
  getItem('用户管理','user',<UserOutlined />),
  getItem('角色管理','role',<MailOutlined />),
  getItem('图形图表','chart',<AreaChartOutlined />,
    [getItem('柱形图','column-chart',<BarChartOutlined />),
    getItem('折线图','line-chart',<LineChartOutlined />),
    getItem('饼图','pie-chart',<PieChartOutlined />)]),
]
//#endregion

//根据当前路径 配对
function getKeys(items,pathname) {
  console.log(14)
  const selectedKey = [],
    openKey = getOpenKey(items)?.key
  function getOpenKey(items) {
    return items.find(item => {
      const { children,key } = item
      return children ? getOpenKey(children) :
        pathname.includes(key) ? !!selectedKey.push(key) : false
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


  function handleNavigation({ key }) {
    navigate(key)
  }
  return (
    <div className='sider'>
      <h1 className='title' style={{ fontSize }}>后台管理 </h1>
      <Menu
        defaultSelectedKeys={selectedKey}
        defaultOpenKeys={[openKey]}
        mode="inline"
        onClick={handleNavigation}
        theme="dark"
        items={items}
      />
      <Button type='link' style={{ backgroundColor: '#0f2640' }}
        onClick={toggleCollapsed}
        block>
        {collapsed ? <RightOutlined title='展开' /> : <LeftOutlined title='收起' />}
      </Button>

    </div>
  )
}


