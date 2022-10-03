import React,{ useEffect } from 'react'
import { Select,Form,Input } from 'antd';
const { Option } = Select
const { Item } = Form

export default function AddForm(props) {
  const form = Form.useForm()[0]  // 使用钩子得到form实例
  const { options,defaultSelected,setForm } = props

  useEffect(() => {
    setForm(form)
  },[form,setForm])
  useEffect(() => {
    form.setFieldValue('catType',defaultSelected)
  })
  return (
    <Form layout='vertical' form={form} >
      <Item label='所属分类：' name='catType'
      >
        <Select >{
          options.map(({ cat,key }) => (
            <Option key={key} value={key}>{cat}</Option>
          ))
        }
        </Select>
      </Item>
      <Item label='分类名称：' name='catName'
        rules={[{ required: true,message: '名称不能为空' }]}
      >
        <Input />
      </Item>

    </Form>
  )
}
