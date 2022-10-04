import React,{ useEffect,useState } from 'react'
import { PlusOutlined,RightOutlined } from '@ant-design/icons';
import { Input,Modal,Card,Row,Col,Button,Table } from 'antd';
import $axios from '@/api/http.js';
import AddForm from './addForm';

export default function Category() {
  const [addForm,setAddForm] = useState(null)  //子组件中的form实例
  const [resolve,setResolve] = useState(null)  //保存任务中期约的resolve，用于控制流程

  const [data,setData] = useState([])  //一级分类数据
  const [subData,setSubData] = useState([])  //二级分类数据
  const [currentType,setCurrentType] = useState(0)  //1 代表 显示一级 ；2 代表显示二级

  const [iptText,setIptText] = useState('')
  // 控制界面模态框，0：不显示 1：显示添加界面 2：显示修改界面
  const [showStatus,setShowStatus] = useState(0)

  useEffect(() => {
    $axios('/api/cat-list').then(({ data }) => {
      setData(data)
    })
  },[])

  // 表格 列 配置项
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
      render(_,item) {
        return (
          <>
            <Button
              onClick={() => editCat(item)}
              type='link'>修改分类</Button>
            {currentType === 0 && <Button
              onClick={() => showSubCat(item)}
              type='link'>查看子分类</Button>}
          </>
        )
      }
    },

  ]
  // 子级标题
  const subTitle = () => (
    currentType !== 0 &&
    <><RightOutlined />
      <Button type='link'> {data.find(v => v.key === currentType).cat}</Button>
    </>
  )
  //Card 组件的标题组件
  const title = (
    <Row justify='space-between'>
      <Col>
        <Button type='link' onClick={() => setCurrentType(0)}>一级分类列表</Button>
        {subTitle()}
      </Col>
      <Col ><Button type='primary' onClick={addCat} icon={<PlusOutlined />}>添加</Button></Col>
    </Row>
  )

  // 查看子分类
  function showSubCat({ key,subCat }) {
    setSubData(subCat)
    setCurrentType(key)
  }
  // 添加分类
  function addCat() {
    new Promise(res => {
      setShowStatus(1)
      setResolve(() => res)
    }).then(values => {
      setShowStatus(0)
      const { catType,catName: cat } = values
      if (catType === 0) {
        setData(data.concat({ cat,key: cat,subCat: [] }))
      } else {
        setSubData(subData.concat({ cat,key: cat }))
      }
    })
  }
  // 修改分类
  function editCat(item) {
    new Promise(res => {
      setIptText(item.cat)  //让输入框显示当前分类名
      setShowStatus(2)
      setResolve(() => res)
    }).then(text => {
      item.cat = text
      setShowStatus(0)
      currentType === 0 ? setData(data.concat(item)) :
        setSubData(subData.concat(item))
    })
  }
  const currentData = currentType === 0 ? data : subData

  const options = [{ cat: '一级分类',key: 0 }]
    .concat(data.map(({ cat,key }) => ({ cat,key })))
  return (
    <>
      <Modal title="修改分类"
        open={showStatus === 2}
        onCancel={() => setShowStatus(0)}
        onOk={() => resolve(iptText)}
      >
        <Input
          status='warning'
          onChange={({ target }) => setIptText(target.value)} value={iptText} />
      </Modal>
      <Modal title="添加分类"
        open={showStatus === 1}
        onCancel={() => setShowStatus(0)}
        onOk={() => addForm.validateFields().then(resolve).catch(err => err)}
      >
        <AddForm options={options}
          defaultSelected={currentType}
          setForm={form => setAddForm(form)} />
      </Modal>
      <Card
        title={title}
        bordered={false}
        style={{
          width: '100%',
        }}
      >
        <Table
          size='small'
          columns={columns}
          dataSource={currentData}
        />
      </Card>
    </>
  )
}
