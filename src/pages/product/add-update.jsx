
import React,{ useEffect,useState } from 'react'
import { PlusOutlined,LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom';
import { Form,Input,Select,Card,Cascader,InputNumber,Upload,Row,Col,Button } from 'antd';
import $axios from '@/api/http.js';
const { Item } = Form
const { Option } = Select
export default function Category() {
  const navigate = useNavigate()



  //Card 组件的标题组件
  const title = (
    <Button type='link' onClick={() => navigate(-1)}><LeftOutlined />添加商品</Button>
  )






  return (
    <>

      <Card
        title={title}
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        <Form style={{ maxWidth: 500 }}>

          <Item label="商品名称">
            <Input />
          </Item>
          <Item label="商品描述">
            <Input.TextArea style={{ resize: 'none' }} placeholder='请输入商品描述' rows={4} />
          </Item>

          <Item label="商品价格">
            <InputNumber addonAfter="￥" />
          </Item>

          <Item label="商品分类">
            <Cascader
              options={[
                {
                  value: 'zhejiang',
                  label: 'Zhejiang',
                  children: [
                    {
                      value: 'hangzhou',
                      label: 'Hangzhou',
                    },
                  ],
                },
              ]}
            />
          </Item>

          <Item label="商品详情" valuePropName="fileList">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Item>
          <Item
            style={{ padding: '0 20%' }}
          >
            <Button
              block
              type='primary' htmlType='submit'>提交</Button>
          </Item>
        </Form>
      </Card>

    </>
  )
}
