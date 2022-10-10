
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
const Login = lazy(() => import('../pages/login/'))
const Admin = lazy(() => import('../pages/admin'))
const Home = lazy(() => import('../pages/home/home.tsx'))
// 商品目录
const Category = lazy(() => import('../pages/category/category'))

const Role = lazy(() => import('../pages/role/role'))
const User = lazy(() => import('../pages/user/user'))
// 图形图表
const Column = lazy(() => import('../pages/chart/column.tsx'))
const Line = lazy(() => import('../pages/chart/line.tsx'))
const PieChart = lazy(() => import('../pages/chart/pie.tsx'))
//产品管理
const Product = lazy(() => import('../pages/product/'))
const ProductHome = lazy(() => import('../pages/product/home'))
const AddUpdate = lazy(() => import('../pages/product/add-update'))
const Detail = lazy(() => import('../pages/product/detail'))


/* 配置路由 */

const rules = [
  { path: '',element: <Navigate to='login' /> },
  { path: 'login',element: <Login /> },
  {
    path: 'admin',element: <Admin />,children: [
      { path: '',element: <Navigate to='home' /> },
      { path: 'home',element: <Home /> },
      { path: 'category-manage',element: <Category /> },
      {
        path: 'product-manage',element: <Product />,
        children: [
          { path: '',element: <ProductHome /> },
          { path: 'product-home',element: <ProductHome /> },
          { path: 'add-update',element: <AddUpdate /> },
          { path: 'detail',element: <Detail /> },

        ]
      },
      { path: 'user',element: <User /> },
      { path: 'role',element: <Role /> },
      { path: 'column-chart',element: <Column /> },
      { path: 'line-chart',element: <Line /> },
      { path: 'pie-chart',element: <PieChart /> },
    ]
  },
]
export default rules
