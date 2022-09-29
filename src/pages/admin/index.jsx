import React,{ useState,Suspense } from 'react'
import { Navigate,Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import LeftNav from '@/components/left-nav/';
const { Header,Footer,Sider,Content } = Layout;
/* 管理路由组件 */

export default function Home() {
  const { isLogin } = useSelector(({ loginReducer }) => loginReducer)
  const [collapsed,setCollapsed] = useState(false)

  if (!isLogin) return <Navigate to='/login' replace />

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout style={{ height: '100%' }}>
      <Sider collapsed={collapsed} >
        <LeftNav toggleCollapsed={toggleCollapsed} collapsed={collapsed}></LeftNav>
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content>
          <Suspense>
            <Outlet></Outlet>
          </Suspense>
        </Content>
        <Footer>
          <div style={{ textAlign: 'center',color: 'gray' }}>推荐使用谷歌浏览器以获得最佳体验</div>
        </Footer>
      </Layout>
    </Layout>
  )
}
