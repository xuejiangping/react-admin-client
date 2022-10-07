import React,{ useEffect,useState } from 'react'
import { Table,Card,Form,Row,Col,Button,Input,Modal } from 'antd';
import $axios from '@/api//http.js';
const { Item,useForm } = Form
export default function User() {
  const [dataList,setDataList] = useState([])
  const [addModal,setAddModal] = useState(false)
  const form = useForm()
  const title = (
    <Button type='primary' onClick={() => setAddModal(true)}>创建用户</Button>
  )
  const setColumns = (title,dataIndex,render) => ({ title,dataIndex,render })
  const columns = [
    setColumns('用户名','uname'),
    setColumns('邮箱','email'),
    setColumns('电话','tel'),
    setColumns('注册时间','regtime'),
    setColumns('所属角色','role'),
    setColumns('操作','action',(value,item) => (
      <>
        <Button type='link' onClick={() => console.log(value,item)}>修改</Button>
        <Button type='link'>删除</Button>
      </>
    ))
  ]
  useEffect(() => {
    $axios('/api/user').then(({ data }) => {
      setDataList(data)
    })
  },[])
  const setAddOptions = (label,name,type) => ({ label,name,type })
  const addFormOptions = [
    setAddOptions('用户名','name'),
    setAddOptions('密码','password','password'),
    setAddOptions('手机号','tel','tel'),
    setAddOptions('邮箱','email','email'),
    setAddOptions('角色','role'),


  ]
  function createUser() {
    const values = form
    console.log(values)
  }


  return (
    <Card title={title}>
      <Table
        rowKey='key'
        columns={columns}
        dataSource={dataList}
      />
      <Modal open={addModal}
        title='创建用户'
        onOk={createUser}
        onCancel={() => setAddModal(false)}>
        <Form labelAlign='left' form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}>
          {addFormOptions.map((v,i) => (
            <Item  {...v} key={i} labelAlign='right' required>
              <Input type={v.type} />
            </Item>
          ))}
        </Form>
      </Modal>
    </Card>

  )
}
