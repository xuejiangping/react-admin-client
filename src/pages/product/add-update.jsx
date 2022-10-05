/* 添加商品 和 更新商品 */
import React,{ useState,useEffect } from 'react'
import { PlusOutlined,LeftOutlined } from '@ant-design/icons'
import { useNavigate,useLocation } from 'react-router-dom';
import { Form,Input,Card,Cascader,InputNumber,Upload,Button } from 'antd';
import { Editor,} from "react-draft-wysiwyg";
import { EditorState,convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import $axios from '@/api/http.js';

const { Item } = Form
export default function Add_Update() {
  const [form] = Form.useForm()
  const [data,setData] = useState({})  //一级分类数据

  const navigate = useNavigate()
  const product = useLocation().state  //若有商品信息传入，代表更新
  const [editorState,setEditorState] = useState(EditorState.createEmpty())
  //Card 组件的标题组件
  const title = (
    <Button type='link' onClick={() => navigate(-1)}><LeftOutlined />
      {product ? '修改' : '添加'}商品</Button>
  )
  function onFinished(values) {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    console.log(html,values)
    console.log(form)
  }
  useEffect(() => {
    form.setFieldsValue(product)
    $axios('/api/cat-list').then(({ data }) => {
      setData({
        categories: data,
        options: data.map(({ cat,subCat }) => ({
          value: cat,label: cat,
          children: subCat?.map(({ cat }) => ({ value: cat,label: cat }))
        }))
      })
    })
  },[])


  return (
    <>
      <Card
        title={title}
        style={{
          width: '100%',
        }}
      >
        <Form form={form} style={{ maxWidth: 500 }} validateMessages='12' onFinish={onFinished}>
          <Item label="商品名称" name='pname' rules={[{ required: true }]}>
            <Input />
          </Item>
          <Item label="商品描述" name='desc' required>
            <Input.TextArea style={{ resize: 'none' }} placeholder='请输入商品描述' autoSize />
          </Item>

          <Item label="商品价格" name='price' required>
            <InputNumber addonAfter="￥" min={1} />
          </Item>

          <Item label="商品分类" name='cat' required>
            <Cascader
              options={data.options}
            />
          </Item>

          <Item label="商品图片" valuePropName="fileList">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Item>
          <Item label='商品详情' >
            <Editor
              editorStyle={{
                border: '1px solid #c1c1bf',minHeight: 150,
                padding: '0 5px',cursor: 'text'
              }}
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={editorState => setEditorState(editorState)}
            />
          </Item>
          <Item style={{ textAlign: 'center' }} >
            <Button
              type='primary' htmlType='submit'>提交</Button>
          </Item>
        </Form>
      </Card>

    </>
  )
}


