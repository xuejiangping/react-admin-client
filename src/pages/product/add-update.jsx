/* 添加商品 和 更新商品 */
import React,{ useState,useEffect,useRef } from 'react'
import { PlusOutlined,LeftOutlined } from '@ant-design/icons'
import { useNavigate,useLocation } from 'react-router-dom';
import { Form,Input,Card,Cascader,InputNumber,Upload,Button,Modal,message } from 'antd';

import RichEditor from './richEditor';
import $axios from '@/api/http.js';
const { Item } = Form
export default function Add_Update() {

  const [form] = Form.useForm()
  const [data,setData] = useState({})  //一级分类数据

  const navigate = useNavigate()
  const product = useLocation().state  //若有商品信息传入，代表更新
  // const [editorState,setEditorState] = useState(EditorState.createEmpty())
  const [previewOpen,setPreviewOpen] = useState(false)
  const [previewImage,setPreviewImage] = useState('')
  const [fileList,setFileList] = useState([])
  const editor = useRef()


  //Card 组件的标题组件
  const title = (
    <Button type='link' onClick={() => navigate(-1)}><LeftOutlined />
      {product ? '修改' : '添加'}商品</Button>
  )
  useEffect(() => {
    if (!!product) {
      if (typeof product.picUrl[0] === 'string') {
        const list = product.picUrl.map((v,i) => ({
          uid: -i,
          name: v.split('/')?.pop(),
          status: 'done',
          url: v
        }))
        setFileList(list)
      }
      form.setFieldsValue(product)
    }
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
  // 提交表单
  function onFinished(values) {
    // const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
    // console.log(html,values)
    const detail = editor.current.getDetail()
    values.detail = detail
    values.fileList = fileList
    console.log(values)

  }
  // 上传图片预览
  function handlePreview(file) {
    setPreviewOpen(true)
    const { originFileObj,preview,url } = file
    if (!url && !preview) file.preview = URL.createObjectURL(originFileObj)
    setPreviewImage(url || file.preview)
  }

  // 关闭预览
  function handleCancel() {
    setPreviewOpen(false)
  }
  // 图片上传
  function handleChange({ file,fileList }) {
    const { status,response } = file
    if (status === 'done') {
      if (response.status !== 1) return message.error('上传失败')
      message.success('上传成功')
      file.url = response.data.url
    }
    else if (status === 'removed') {
      // 执行删除图片请求
      message.success('删除图片成功')
    }
    setFileList(fileList)
  }
  return (
    <>
      <Card
        title={title}
        style={{
          width: '100%',
        }}
      >
        <Form form={form} style={{ maxWidth: 500 }} validateMessages='12' onFinish={onFinished}>
          <Item label="商品名称" name='pname' required>
            <Input />
          </Item>
          <Item label="商品描述" name='desc' required>
            <Input.TextArea style={{ resize: 'none' }} placeholder='请输入商品描述' autoSize />
          </Item>

          <Item label="商品价格" name='price' required>
            <InputNumber addonAfter="￥" min={1} />
          </Item>

          <Item label="商品分类" name='category' required>
            <Cascader
              options={data.options}
            />
          </Item>

          <Item label="商品图片" >
            <Upload action="/api/upload" listType="picture-card" accept='image/*'
              onPreview={handlePreview}
              fileList={fileList}
              onChange={handleChange}

            >
              {fileList.length < 3 && <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>}
            </Upload>
          </Item>
          <Item label='商品详情' name='detail'>
            <RichEditor ref={editor} />
          </Item>
          <Item style={{ textAlign: 'center' }} >
            <Button
              type='primary' htmlType='submit'>提交</Button>
          </Item>
        </Form>
      </Card>
      <Modal
        open={previewOpen} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{ width: '100%' }}
          src={previewImage}
        />
      </Modal>
    </>
  )
}


