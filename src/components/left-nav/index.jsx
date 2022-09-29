import React from 'react'
import { useNavigate } from 'react-router-dom';
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
  getItem('首页','1',<HomeOutlined />),
  getItem('商品','2',<ShoppingCartOutlined />,
    [getItem('品类管理','sub1'),getItem('商品管理','sub2')]),
  getItem('用户管理','3',<UserOutlined />),
  getItem('角色管理','4',<MailOutlined />),
  getItem('图形图表','5',<AreaChartOutlined />,
    [getItem('柱形图','sub3',<BarChartOutlined />),
    getItem('折线图','sub4',<LineChartOutlined />),
    getItem('饼图','sub5',<PieChartOutlined />)]),
]
//#endregion

//#region 路由字典
const ROUTE_KEY_MAP = {
  1: 'home',
  3: 'user',
  4: 'role',
  sub1: 'category-manage',
  sub2: 'product-manage',
  sub3: 'column-chart',
  sub4: 'line-chart',
  sub5: 'pie-chart',
}
//#endregion
export default function LeftNav(props) {
  const navigate = useNavigate()
  const { toggleCollapsed,collapsed } = props
  const fontSize = collapsed ? '14px' : '26px'
  function handleNavigation({ key }) {
    const toPath = ROUTE_KEY_MAP[key]
    navigate(toPath)
  }
  return (
    <div className='sider'>
      <h1 className='title' style={{ fontSize }}>后台管理 </h1>
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        onClick={handleNavigation}
        theme="dark"
        // inlineCollapsed={collapsed}
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

