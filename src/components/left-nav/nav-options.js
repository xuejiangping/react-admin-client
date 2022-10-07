//#region 该数据映射边栏导航菜单结构


import {

  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  MailOutlined,
  BarChartOutlined,
  AreaChartOutlined,
  PieChartOutlined,
  LineChartOutlined
} from '@ant-design/icons';
// key label 的映射关系数组
const key_label_map = []
function getItem(label,key,icon,children,type) {
  key_label_map.push({ label,key })
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
export { items,key_label_map }