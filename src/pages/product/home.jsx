import React,{ useEffect,useState } from 'react'
import { useNavigate,NavLink } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Form,Input,Select,Card,Row,Col,Button,Table } from 'antd';
import $axios from '@/api/http.js';
const { Item } = Form
const { Option } = Select
export default function Category() {
  const [products,setProducts] = useState([])
  const [originalData,setOriginalData] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    $axios('/api/product').then(({ data }) => {
      setOriginalData(data)
      setProducts(data)
    })
  },[])


  // 表格 列 配置项
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'pname',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
      width: '30%'
    },
    {
      title: '价格',
      dataIndex: 'price',
      render(price) {
        return '￥' + price
      }
    },
    {
      title: '状态',
      dataIndex: 'onsale',
      render(onsale,item) {
        return (<>
          <Button
            onClick={() => changeSaleStatus(item)}
            danger type='primary' style={{ marginBottom: '8px' }}>{onsale ? '下架' : '在售'}</Button>
          <Button type='text' disabled>{onsale ? '在售' : '下架'}</Button>
        </>)
      }
    },
    {
      title: '操作',
      dataIndex: 'action',
      render(_,item) {
        return (
          <>
            <NavLink
              state={item}
              style={{ margin: '0 5px' }} to='add-update'>修改</NavLink>
            <NavLink
              state={item}
              style={{ margin: '0 5px' }} to='detail'>详情</NavLink>
          </>
        )
      }
    },

  ]


  //Card 组件的标题组件
  const title = (
    <Row justify='space-between'>
      <Col>
        <Form layout='inline'
          initialValues={{ type: 'byName' }}
          onFinish={filterSearch}
        >
          <Item name='type'>
            <Select >
              <Option value='byName'>按名称搜索</Option>
              <Option value='byDesc'>按描述搜索</Option>
            </Select>
          </Item>
          <Item name='keyWord'>
            <Input placeholder='关键字' />
          </Item>
          <Item><Button htmlType='submit'>搜索</Button></Item>
        </Form>
      </Col>
      <Col ><Button type='primary'
        onClick={() => navigate('add-update')}
        icon={<PlusOutlined />}>添加商品</Button></Col>
    </Row>
  )
  // 改变商品状态
  function changeSaleStatus(item) {
    item.onsale = !item.onsale
    setProducts([...products])

  }
  // 过滤搜索
  function filterSearch({ type,keyWord }) {

    let data = type === 'byName' ? originalData.filter(v => v.pname.includes(keyWord))
      : originalData.filter(v => v.desc.includes(keyWord))
    setProducts(data)
  }




  return (
    <>
      <Card
        title={title}
        style={{
          width: '100%',
        }}
      >
        <Table
          size='small'
          rowKey='key'
          columns={columns}
          dataSource={products}
        />
      </Card>
    </>
  )
}
