import React,{ useEffect,useState } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import { Input,Modal,Card,Row,Col,Button,Table } from 'antd';
import $axios from '@/api/http.js';
let dataKey

export default function Category() {
  const [data,setData] = useState([])
  const [iptText,setIptText] = useState('')
  // 控制界面模态框，0：不显示 1：显示添加界面 2：显示更新界面
  const [showStatus,setShowStatus] = useState(false)

  useEffect(() => {
    $axios('/api/cat-list').then(v => {
      setData(v.data)
    })
  },[])

  // 表格数据

  const columns = [
    {
      title: '分类名称',
      key: 'cat',
      dataIndex: 'cat',
      color: 'red'
    },
    {
      title: '操作',
      key: 'action',
      dataIndex: 'action',
      width: '40%',
      render(_,{ actions,key: dataKey }) {
        return actions.map(action =>
        (<Button
          onClick={handleAction(action,dataKey)}
          key={action} type='link'>{action}</Button>))
      }
    },

  ]


  const title = (
    <Row justify='space-between'>
      <Col>一级分类列表</Col>
      <Col ><Button type='primary' onClick={addCat} icon={<PlusOutlined />}>添加</Button></Col>
    </Row>
  )
  // 表格操作列的处理函数
  function handleAction(action,key) {
    return () => {
      if (action === '修改分类') {
        setShowStatus(2)
        dataKey = key
      } else if (action === '查看子分类') {
        checkSubCat(key)
      }
    }
  }
  function checkSubCat(key) {
    const { subCat } = data.find(v => v.key === key)
    setData(subCat)
  }
  // 添加分类
  function addCat() {
    setShowStatus(1)

  }
  // 修改分类
  function editCat() {
    data.some(v => {
      if (v.key === dataKey) {
        v.cat = iptText
        return true
      }
      return false
    })
    setShowStatus(0)
    setData(data)
  }

  return (
    <>
      <Modal title="修改分类"
        open={showStatus === 2}
        onCancel={() => setShowStatus(0)}
        onOk={editCat}
      >
        <Input
          onChange={({ target }) => setIptText(target.value)} value={iptText} />
      </Modal>
      <Modal title="添加分类"
        open={showStatus === 1}
        onCancel={() => setShowStatus(0)}
        onOk={editCat}
      >
        <div>所属分类</div>
        <Input
          onChange={({ target }) => setIptText(target.value)} value={iptText} />
        <div>分类名称</div>
        <Input
          onChange={({ target }) => setIptText(target.value)} value={iptText} />
      </Modal>
      <Card
        title={title}
        bordered={false}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <Table
          size='small'
          style={{ height: '100%' }}
          scroll={{ y: 400 }}
          columns={columns} dataSource={data} />
      </Card>
    </>
  )
}
