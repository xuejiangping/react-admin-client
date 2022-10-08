import React,{ useEffect,useState } from 'react'
import { Form,Input,Modal } from 'antd';


const setAddOptions = (label,name,type) => ({ label,name,type })

const addFormOptions = [
  setAddOptions('用户名','name'),
  setAddOptions('密码','password','password'),
  setAddOptions('手机号','tel','tel'),
  setAddOptions('邮箱','email','email'),
  setAddOptions('角色','role')

]
// 修改界面的表单选项
const updateFormOptions = addFormOptions.filter(v => v.name !== 'password')
const { Item,useForm } = Form
export default function ModalForm(props) {
  const [modalOpen,setModalOpen] = useState(false)
  const [form] = useForm()
  const { status,changeStatus } = props
  // status 0：关闭模态框  1：创建用户  2：修改用户
  useEffect(() => {
    setModalOpen(status !== 0)
  },[status])

  async function handleSubmit() {
    const values = await form.validateFields()
    if (status === 1) { console.log('添加',values) }
    else if (status === 2) { console.log('修改') }
    changeStatus(0)

  }

  return (
    <Modal open={modalOpen}
      title={status === 1 ? '创建用户' : '修改用户'}
      onOk={handleSubmit}
      onCancel={() => changeStatus(0)}>
      <Form labelAlign='left'
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}>
        {(status === 1 ? addFormOptions : updateFormOptions).map((v,i) => (
          <Item
            {...v} key={i} labelAlign='right'
            rules={[{ required: true,message: v.label + '不能为空' }]}
          >
            <Input type={v.type} />
          </Item>
        ))}
      </Form>

    </Modal>
  )
}
