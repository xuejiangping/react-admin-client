import { LockOutlined,UserOutlined } from '@ant-design/icons';
import { Button,Checkbox,Form,Input } from 'antd';
import React from 'react';

const App = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ',values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{
          pattern: /^\w{4,14}$/,
          message: '账户名长度为4-12,且必须由字母、数字、或下划线组成'
        },
        {
          required: true,
          message: '请输入用户名!',
        },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
      </Form.Item>
      <Form.Item

        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },{
            pattern: /^[A-z]\w{3,13}$/,
            message: '密码长度4-12,且须以字母开头，由字母、数字、或下划线组成'
          }
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button block size='large' type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default App;