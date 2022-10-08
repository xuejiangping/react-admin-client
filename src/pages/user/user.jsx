import React,{ useEffect,useState } from 'react'
import { Table,Card,Button,Modal } from 'antd';
import ModalForm from './modal-form';
import $axios from '@/api/http.js';

const { confirm } = Modal


export default function User() {
  const [dataList,setDataList] = useState([])

  const [status,setStatus] = useState(0)
  const [userData,setUserData] = useState(null)


  const title = (
    <Button type='primary' onClick={() => setStatus(1)}>创建用户</Button>
  )

  useEffect(() => {
    $axios('/api/user').then(({ data }) => {
      setDataList(data)
    })
  },[])
  const setColumns = (title,dataIndex,render) => ({ title,dataIndex,render })
  const columns = [
    setColumns('用户名','uname'),
    setColumns('邮箱','email'),
    setColumns('电话','tel'),
    setColumns('注册时间','regtime'),
    setColumns('所属角色','role'),
    setColumns('操作','action',(value,item) => (
      <>
        <Button type='link' onClick={updateUser}>修改</Button>
        <Button type='link' onClick={() => deleteUser(item)}>删除</Button>
      </>
    ))
  ]
  function updateUser(user) {
    setStatus(2)
    setUserData(user)
  }
  function deleteUser(user) {
    confirm({
      content: '确定要删除吗？',
      onOk() {
        console.log(user)
        Promise.resolve()
      }
    })
  }

  // function createUser() {
  //   setIsAdd(true)
  //   // form.validateFields().then(values => {
  //   //   console.log(values)
  //   // })
  // }


  return (
    <Card title={title}>
      <Table
        rowKey='key'
        columns={columns}
        dataSource={dataList}
      />
      <ModalForm status={status} changeStatus={(n) => setStatus(n)} userData={userData} />
      {/* <Modal open={addModal}
        title='创建用户'
        onOk={createUser}
        onCancel={() => setAddModal(false)}>
        <Form labelAlign='left'
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}>
          {addFormOptions.map((v,i) => (
            <Item
              {...v} key={i} labelAlign='right'
              rules={[{ required: true,message: v.label + '不能为空' }]}
            >
              <Input type={v.type} />
            </Item>
          ))}
        </Form>

      </Modal> */}

    </Card>

  )
}
