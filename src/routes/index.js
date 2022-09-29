
import { lazy } from 'react'
const Login = lazy(() => import('../pages/login/'))
const Admin = lazy(() => import('../pages/admin'))
const Home = lazy(() => import('../pages/home/home'))
const Category = lazy(() => import('../pages/category/category'))
const Role = lazy(() => import('../pages/role/role'))
const User = lazy(() => import('../pages/user/user'))
const Product = lazy(() => import('../pages/product/product'))
const Column = lazy(() => import('../pages/chart/column'))
const Line = lazy(() => import('../pages/chart/line'))
const PieChart = lazy(() => import('../pages/chart/pie'))

/* 配置路由 */

const rules = [
  { path: '',element: <Login /> },
  { path: 'login',element: <Login /> },
  {
    path: 'admin',element: <Admin />,children: [
      { path: '',element: <Home /> },
      { path: 'home',element: <Home /> },
      { path: 'category-manage',element: <Category /> },
      { path: 'product-manage',element: <Product /> },
      { path: 'user',element: <User /> },
      { path: 'role',element: <Role /> },
      { path: 'column-chart',element: <Column /> },
      { path: 'line-chart',element: <Line /> },
      { path: 'pie-chart',element: <PieChart /> },
    ]
  },
]
export default rules
