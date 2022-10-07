import React,{ useState,useEffect,useRef } from 'react'
import { useStore } from 'react-redux';
import {
  Modal,Input,
  Space,Radio,Table,Card,Row,Col,Button
} from 'antd';
import $axios from '@/api/http.js';
import AuthForm from './authForm';
export default function Role() {

  const [dataList,setDataList] = useState([])
  const [selectedKey,setSelectedKey] = useState()
  const [addModalOpen,setAddModalOpen] = useState(false)
  const [rolePowerModalOpen,setRolePowerModalOpen] = useState(false)



  const addInput = useRef()
  const grantor = useStore().getState().loginReducer.data.name
  useEffect(() => {
    $axios('/api/role').then(({ data }) => {
      setDataList(data)
    })
  },[])

  //创建角色
  function createRole() {
    const roleName = addInput.current.input.value
    const date = new Date().toLocaleDateString().replaceAll('/','.')
    const role = {
      key: roleName,
      roleName,
      regtime: date,
      grantTime: date,
      grantor
    }
    setDataList([...dataList,role])
    setAddModalOpen(false)

  }
  function setRolePower() {

  }
  const title = (
    <>
      <Space>
        <Button type='primary'
          onClick={() => setAddModalOpen(true)}
        >创建角色</Button>
        <Button type='primary'
          onClick={() => setRolePowerModalOpen(true)}
          disabled={selectedKey ? false : true}
        >设置角色权限</Button>
      </Space>
    </>
  )
  const setColumns = (title,dataIndex,render) => ({ title,dataIndex,render })
  const columns = [
    setColumns('','status',(_,item) => (
      <Radio value={item.key} />
    )),
    setColumns('角色名称','roleName'),
    setColumns('创建时间','regtime'),
    setColumns('授权时间','grantTime'),
    setColumns('授权人','grantor'),
  ]



  return (
    <Card title={title} >
      <Radio.Group
        style={{ width: '100%' }}
        onChange={({ target }) => setSelectedKey(target.value)}>
        <Table
          rowKey='key'
          columns={columns}
          dataSource={dataList}

        />
      </Radio.Group>
      <Modal open={addModalOpen} onCancel={() => setAddModalOpen(false)}
        onOk={createRole} title='添加角色'
      >
        <label title='角色名称'>角色名称：< Input ref={addInput} /></label>
      </Modal>
      <Modal open={rolePowerModalOpen} onCancel={() => setRolePowerModalOpen(false)}
        onOk={createRole} title='设置角色权限'
      >
        <AuthForm />
      </Modal>
    </Card>
  )
}
