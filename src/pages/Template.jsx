import React from 'react'
import { Table,Card,Row,Col,Button,TableColumnsType,FormListFieldData } from 'antd';
export default function User() {

  const title = (
    <Button type='primary'>创建用户</Button>
  )
  const setColumns = (title,dataIndex,render) => ({ title,dataIndex,render })
  const columns = [
    setColumns('操作','action',(value,item) => {

    })

  ]



  return (
    <Card title={title}>
      <Table
        rowKey
        columns={columns}
        dataSource={[]}
      />
    </Card>
  )
}
