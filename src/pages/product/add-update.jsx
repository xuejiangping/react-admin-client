
import React,{ useEffect,useState } from 'react'
import { PlusOutlined,LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { Form,Input,Select,Card,Cascader,InputNumber,Upload,Row,Col,Button } from 'antd';
import { Editor,} from "react-draft-wysiwyg";
import { EditorState,convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const { Item } = Form


export default function Add_Update() {
  const navigate = useNavigate()
  const [editorState,setEditorState] = useState(EditorState.createEmpty())

  //Card 组件的标题组件
  const title = (
    <Button type='link' onClick={() => navigate(-1)}><LeftOutlined />添加商品</Button>
  )
  function onFinished(data) {
    const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    console.log(html,data)
  }

  return (
    <>
      <Card
        title={title}
        style={{
          width: '100%',
        }}
      >
        <Form style={{ maxWidth: 500 }} onFinish={onFinished}>
          <Item label="商品名称" name='pname'>
            <Input />
          </Item>
          <Item label="商品描述" name='desc'>
            <Input.TextArea style={{ resize: 'none' }} placeholder='请输入商品描述' rows={4} />
          </Item>

          <Item label="商品价格" name='price'>
            <InputNumber addonAfter="￥" />
          </Item>

          <Item label="商品分类" name='cat'>
            <Cascader
              options={[
                {
                  value: 'zhejiang',
                  label: 'Zhejiang',
                  children: [
                    {
                      value: 'hangzhou',
                      label: 'Hangzhou',
                    }
                  ]
                }
              ]}
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


