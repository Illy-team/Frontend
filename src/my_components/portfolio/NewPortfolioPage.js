import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // 뒤로가기 기능을 위해 가져오기
import { Layout, Menu, Card, Col, Row, Button, Table, Modal, Form, Input  } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import NewPortfolioPage from "./NewPortfolioPage";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;


function Portfolio({setIsAddingPortfolio}) {

    // AWS EC2 서버 URL과 TOKEN
    const API_URL = 'http://15.164.143.17:8080/api/v1/users/projects/image';
    const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';

    // 저장 함수
    const savePortfolio = async (portfolio) => {
        try {
            // FormData 객체 생성
            const formData = new FormData();
            // form의 값 추가
            formData.append('title', portfolio.title);
            formData.append('subject', portfolio.subject);
            formData.append('category', portfolio.category);
            formData.append('role', portfolio.role);
            formData.append('date', portfolio.date);
            formData.append('content', portfolio.content);
            // 이미지 파일 추가
            formData.append('thumbnail', portfolio.thumbnail);
    
            const response = await axios.post(API_URL, formData, {
                headers: { 
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'multipart/form-data'  // 요청 헤더에 content-type을 multipart/form-data로 설정
                }
            });
        /*
        try {
          const response = await axios.post(API_URL, {
            title: portfolio.title,
            subject: portfolio.subject,
            category: portfolio.category,
            role: portfolio.role,
            date: portfolio.date,
            content: portfolio.content,
            thumbnail: portfolio.thumbnail,
            headers: { Authorization: `Bearer ${TOKEN}` }
          });
      */
          if (response.data.status === 201) {
            console.log(response.data.message);
            return response.data.data;
          }
          
        // 성공 팝업창
        Modal.success({
            content: '포트폴리오 등록을 성공하였습니다.',
            onOk() {
                navigate('/');
            }
        });
        setIsAddingPortfolio (false);
        } catch (error) {
          console.error(error);
          // 실패 팝업창
          Modal.error({
            content: '포트폴리오 등록에 실패하였습니다.' + error,
            });
        }
      }


  /** 2. 뒤로가기 기능 함수 */
  const navigate = useNavigate();

  const goBack = () => {
    setIsAddingPortfolio(false);
  };

  /* 3. 이미지 추가 기능 */
  // 이미지 파일과 미리보기 URL state
  const [imageFile, setImageFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);

  // 이미지 선택 핸들러
  const onImageChange = (e) => {
      e.preventDefault();

      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
          setImageFile(file);
          setPreviewURL(reader.result);
      }

      reader.readAsDataURL(file);
  }



  return (
    <div>
        <Form
            name="register"
            initialValues={{ remember: true }}
            onFinish={savePortfolio}
            >
            <h1>프로젝트 세부 정보를 입력해주세요.</h1>
            <p>입력 후 포트폴리오 페이지에 등록됩니다.</p>
            
            <p>프로젝트 분야</p>
            <Form.Item
                name="category"
                rules={[{ required: true, message: '해커톤' }]}
            >
                <Input placeholder="해커톤" />
            </Form.Item>

            <p>프로젝트 주제</p>
            <Form.Item
                name="subject"
                rules={[{ required: true, message: 'IT 소프트웨어 게임' }]}
            >
                <Input placeholder="IT 소프트웨어 게임'" />
            </Form.Item>

            <p>프로젝트 기간</p>
            <Form.Item
                name="date"
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                type="username"
                placeholder="2024.01.22 ~ 2024.02.03"
                />
            </Form.Item>

            <p>프로젝트 이름</p>
            <Form.Item
                name="title"
                rules={[{ required: true, message: '내용을 입력하세요.' }]}
            >
                <Input
                type="username"
                placeholder="내용을 입력하세요."
                />
            </Form.Item>

            <p>수행 역할</p>
            <Form.Item
                name="role"
                rules={[{ required: true, message: '내용을 입력하세요.' }]}
            >
                <Input
                type="username"
                placeholder="내용을 입력하세요."
                />
            </Form.Item>

            <p>프로젝트 세부 내용</p>
            <Form.Item
                name="content"
                rules={[{ required: true, message: '내용을 입력하세요.' }]}
            >
                <Input
                type="username"
                placeholder="내용을 입력하세요."
                />
            </Form.Item>

            {/* 로컬이미지 형식
            <p>프로젝트 이미지</p>
            <Form.Item
                name="thumbnail"
                rules={[{ required: true, message: '내용을 입력하세요.' }]}
            ><Input type="file" name="image" onChange={onImageChange} />
            {previewURL && <img src={previewURL} alt="프로젝트 이미지 미리보기" style={{width: '200px', height: 'auto'}} />}
            </Form.Item>
            */}
            {/** site url 형식 */}
            <p>프로젝트 이미지</p>
            <Form.Item
                name="thumbnail"
                rules={[{ required: true, message: '내용을 입력하세요.' }]}
            ><Input
            type="username"
            placeholder="내용을 입력하세요."
            /></Form.Item>

            <Form.Item>
                <Button onClick={goBack}>뒤로 가기</Button>
                <Button type="primary" htmlType="submit" onClick={savePortfolio}>
                저장
                </Button>
            </Form.Item>
        </Form>
      
    </div>
  );
};

export default Portfolio;