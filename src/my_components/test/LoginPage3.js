import React from 'react';
import { Form, Input, Button } from 'antd';

const LoginPage = () => {

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div>
        <h3>뭐라도 좀 </h3>
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        >
        <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
        >
            <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
        >
            <Input
            type="password"
            placeholder="Password"
            />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
            </Button>
        </Form.Item>
        </Form>
    </div>
  );
};

export default LoginPage;
