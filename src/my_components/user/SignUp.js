import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // 뒤로가기 기능을 위해 가져오기
import { Form, Input, Button, Modal, Checkbox } from 'antd';

const RegistrationForm = () => {
  // 서버 정보
  const API_URL = 'http://15.164.143.17:8080/api/v1/auth/register';
  const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';
  

  const navigate = useNavigate();

  /** 1. 회원가입 기능 함수 */
  const onFinish = async (values) => {
    console.log('Success:', values);

    // 회원가입 이벤트
    try {
      const response = await axios.post(API_URL, {
        email: values.email,
        name: values.username,
        password: values.password
      }, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
      console.log(response.data);
      // 성공적으로 회원가입이 되었다면, 로그인 페이지나 홈 페이지로 이동하도록 코드를 추가해주세요.

      // 성공 팝업창
      Modal.success({
        content: '회원가입에 성공하였습니다.',
        onOk() {
          navigate('/');
        }
      });


    } catch (error) {
      console.error('Failed to register:', error);
      // 회원가입에 실패하였다면, 사용자에게 실패 메시지를 보여주는 코드를 추가해주세요.
      // 실패 팝업창
      Modal.error({
        content: '회원가입에 실패하였습니다.' + error,
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  /** 2. 뒤로가기 기능 함수 */
  const goBack = () => {
    // 첫 페이지로 가기
//    navigate("/");

    // 뒤로가기
    navigate(-1);
  };


  /** 3. 화면에 출력 */
  return (
    <Form
      name="register"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      
      <p>이름</p>
      <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
      >
          <Input placeholder="Username" />
      </Form.Item>

      <p>이메일 주소</p>
      <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your Email!' }]}
      >
          <Input
          type="email"
          placeholder="email"
          />
      </Form.Item>

      <p>비밀번호</p>
      <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
      >
          <Input
          type="password"
          placeholder="대소문자 포함한 10~16자의 패스워드를 등록해주세요."
          />
      </Form.Item>

      <Form.Item>
        <Button onClick={goBack}>뒤로 가기</Button>
        <Button type="primary" htmlType="submit">
          회원가입
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistrationForm;
