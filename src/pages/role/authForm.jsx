import React,{ useEffect,useState,forwardRef,useImperativeHandle } from 'react'
import { Form,Input,Modal,Tree } from 'antd';
import { items } from '@/components/left-nav/nav-options.js';
const Item = Form.Item


export default forwardRef(AuthForm)

function AuthForm(props,authModalRef) {
  const { menus,roleName } = props.selectedUser
  const [checkedKeys,setCheckedKeys] = useState([])
  const [modalOPen,setModalOpen] = useState(false)

  useImperativeHandle(authModalRef,() => ({ setModalOpen }))

  useEffect(() => {
    setCheckedKeys(menus)
  },[menus])

  const treeData = [
    {
      title: '平台权限',
      key: '0',
      children: getTreeData(items)
    }
  ]

  function getTreeData(arr) {
    return arr.map(({ children,label,key },i) => {
      let o = { title: label,key }
      if (children) o.children = getTreeData(children)
      return o
    })
  }

  const tProps = {
    treeData,
    selectable: false,
    checkable: true,
    checkedKeys,
    onSelect: console.log,
    onCheck(checkedKeys) {
      setCheckedKeys(checkedKeys)
    }

  }

  // 设置权限
  function setAuth() {
    console.log(checkedKeys)
  }


  return (
    <Modal open={modalOPen} onCancel={() => setModalOpen(false)}
      onOk={setAuth} title='设置角色权限'
    >
      < Form>
        <Item label='角色名称' >
          <Input disabled value={roleName} />
        </Item>
        <Item>
          <Tree {...tProps}
          />
        </Item>

      </Form>
    </Modal>
  )
}
