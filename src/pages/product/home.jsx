import React,{ useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { Form,Input,Select,Card,Row,Col,Button,Table } from 'antd';
import $axios from '@/api/http.js';
const { Item } = Form
const { Option } = Select
export default function Category() {
  const [products,setProducts] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    $axios('/api/product').then(({ data }) => {
      setProducts(data)
    })
  },[])

  // 表格 列 配置项
  const columns = [
    {
      title: '商品名称',
      key: 'pname',
      dataIndex: 'pname',
    },
    {
      title: '商品描述',
      key: 'desc',
      dataIndex: 'desc',
      width: '30%'
    },
    {
      title: '价格',
      key: 'price',
      dataIndex: 'price',
    },
    {
      title: '状态',
      key: 'status',
      dataIndex: 'status',
      render() {
        return (<>
          <Button type='primary' style={{ margin: '3px 0' }}>下架</Button>
          <Button>在售</Button>
        </>)
      }
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      render(_,{ key,cat }) {
        return (
          <>
            <Button type='link'>修改</Button>
            <Button type='link'>详情</Button>
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
          onFinish={e => console.log(e)}
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
          columns={columns}
          dataSource={products}
        />
      </Card>
    </>
  )
}
