import React, { useState } from 'react';
import axios from 'axios';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Modal } from 'antd';

const LoginPage = ({setIsLoggedIn}) => {
  // 서버 정보
  const API_URL = 'http://15.164.143.17:8080/api/v1/auth/login';
  const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';

  /** 1. 로그인 */
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  
  const onFinish = async (values) => {
    console.log('Success:', values);

    try {
      const response = await axios.post(API_URL, {
        email: values.email,
        name: values.username,
        password: values.password
      }, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
      console.log(response.data);
      setIsLoggedIn(true);

      // 로그인 성공하면 토큰을 로컬 스토리지에 저장
      localStorage.setItem('token', response.data.token);
      setUserInfo(response.data);
      setIsLoggedIn(true);


      // 성공 팝업창
      Modal.success({
//        content: '로그인에 성공하였습니다.',
        content: userInfo.name + "님 반갑습니다!",
        onOk() {
          navigate('/');
        }
      });
    } catch (error) {
      console.error('Failed to register:', error);
      setIsLoggedIn(false);

      // 실패 팝업창
      Modal.error({
        content: '로그인에 실패하였습니다.',
      });
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  /** 2. 회원가입 페이지로 이동 */
  //const history = useHistory();
  /*
  // dom@6 부터는 useHistory()는 안 먹히네
  const goToSign = () => {
    history.push("/sign");
  };
  */
  const goToSign = () => {
    navigate("/join");
  };

  

  /** 3. UI */
  return (
    <div>
        <h1>로그인</h1>
        <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        >

        <p>이메일 주소</p>
        <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
        >
            <Input
            type="email"
            placeholder="내용을 입력하세요."
            />
        </Form.Item>

        <p>비밀번호</p>
        <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
        >
            <Input
            type="password"
            placeholder="내용을 입력하세요."
            />
        </Form.Item>

        <p>계정이 없다면 회원가입 해주세요!</p>
        <Form.Item>
            <Button onClick={goToSign}>회원가입 페이지로 이동</Button>
            <Button type="primary" htmlType="submit" className="login-form-button">
            로그인
            </Button>
        </Form.Item>
        </Form>
    </div>
  );
};

export default LoginPage;
