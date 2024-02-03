import React from 'react';
import { useNavigate } from 'react-router-dom';  // 뒤로가기 기능을 위해 가져오기
import { Form, Input, Button, Checkbox } from 'antd';

const RegistrationForm = () => {

  const serverUrl = "http://ec2-13-125-224-96.ap-northeast-2.compute.amazonaws.com:8080";
  const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';
  

  // 3) 사용자로부터 입력받는 값 저장하기
  const [Username, setUsername] = useState("");    // input 변수의값을 빈 string으로 초기화
  const [email, setEmail] = useState("");    // input 변수의값을 빈 string으로 초기화
  const [name, setName] = useState("");    // input 변수의값을 빈 string으로 초기화
  const [password, setPassword] = useState("");    // input 변수의값을 빈 string으로 초기화
  

  /** 1. 회원가입 기능 함수 */
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  /** 2. 뒤로가기 기능 함수 */
  const navigate = useNavigate();

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
