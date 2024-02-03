import React from 'react';
import axios from 'axios';
//import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Modal } from 'antd';

const UserPage = () => {
  // 서버 정보
  const API_URL = 'http://15.164.143.17:8080/api/v1/users';
  const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';

  /** 1. 로그인 */
  const navigate = useNavigate();

  const onEvent = async (values) => {
    console.log('Success:', values);

    try {
      const response = await axios.get(API_URL, {
        name: values.name
      }, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });
      console.log(response.data);

    } catch (error) {
      console.error('Failed to register:', error);
    }
  };
  
  

  /** 2. 뒤로가기 기능 함수 */
  const goBack = () => {
    // 경로 뒤로가기
    navigate(-1);
  };


  /** 3. UI */
  return (
    <div>
        <p onClick={onEvent}></p>
        <Button onClick={goBack}>뒤로 가기</Button>
    </div>
  );
};

export default UserPage;
