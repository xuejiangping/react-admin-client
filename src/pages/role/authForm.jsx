import React,{ useEffect,useState } from 'react'
import { Form,Input,Tree } from 'antd';
import { items } from '@/components/left-nav/nav-options.js';
const Item = Form.Item
export default function AuthForm(props) {
  const { menus,roleName } = props.selectedUser
  const [checkedKeys,setCheckedKeys] = useState([])
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



  return (
    < Form>
      <Item label='角色名称' >
        <Input disabled value={roleName} />
      </Item>
      <Item>
        <Tree {...tProps}
        />
      </Item>

    </Form>
  )
}
