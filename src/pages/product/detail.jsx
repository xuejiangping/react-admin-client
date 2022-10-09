
import React from 'react'
import { LeftOutlined,RightOutlined } from '@ant-design/icons'
import { useNavigate,useLocation } from 'react-router-dom';
import { Card,Button,Descriptions,Image } from 'antd';
const { Item } = Descriptions
const { PreviewGroup } = Image

export default function Detail() {
  const navigate = useNavigate()
  //Card 组件的标题组件
  const title = (
    <Button type='link' onClick={() => navigate(-1)}><LeftOutlined />添加商品</Button>
  )
  const setContent = (title,content) => ({ title,content })
  const { pname,desc,price,category,picUrl,detail } = useLocation().state
  const productData = [
    setContent('商品名称',pname),
    setContent('商品描述',desc),
    setContent('商品价格',price),
    setContent('所属分类',<span><span>{category[0]}</span><RightOutlined /><span>{category[1]}</span></span>),
    setContent('商品图片',<PreviewGroup  >{picUrl.map((src,i) =>
      <Image key={i} alt={pname} src={src} />
    )}</PreviewGroup>),
    setContent('商品详情',<div ref={el => el && (el.innerHTML = detail)}></div>)
  ]

  return (
    <>
      <Card
        title={title}
        style={{ width: '100%' }}
      >
        {
          productData.map(({ title,content,key },i) => (
            <Descriptions
              key={i}
              bordered>
              <Item label={title}>
                {content}
              </Item>
            </Descriptions>
          ))
        }

        {/* {productData.map(v => (
          <Row justify='space-between'>
            <Col>{v.title}</Col>
            <Col>{v.content}</Col>
          </Row>
        ))} */
        }

      </Card>
    </>
  )
}


