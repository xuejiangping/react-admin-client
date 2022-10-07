import React from 'react'
import { Form,Input,Tree } from 'antd';
import { items } from '@/components/left-nav/nav-options.js';
const Item = Form.Item
export default function setRolePowerForm() {

  const treeData = [
    {
      title: '平台权限',
      key: '0',
      children: getTreeData(items)
    }
  ]

  function getTreeData(arr,k = '0') {
    return arr.map(({ children,label },i) => {
      let o = { title: label,key: k + i }
      if (children) o.children = getTreeData(children,k + i)
      return o
    })
  }
  const tProps = {
    treeData,
    selectable: false,
    checkable: true,
    // defaultExpandedKeys={ ['0-0-0','0-0-1']}
    // defaultSelectedKeys={ ['0-0-0','0-0-1']}
    // defaultCheckedKeys={ ['0-0-0','0-0-1']}
    onSelect: console.log,
    onCheck: console.log

  }



  return (
    < Form>
      <Item label='角色名称'>
        <Input />
      </Item>
      <Item>
        <Tree {...tProps} />
      </Item>

    </Form>
  )
}
