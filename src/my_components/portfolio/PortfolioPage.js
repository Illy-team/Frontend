import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Menu, Card, Col, Row, Button, Table  } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import NewPortfolioPage from "./NewPortfolioPage";

const { Header, Content, Footer } = Layout;
const { Meta } = Card;


function Portfolio() {
  // 1. data 가져오기
  // [2] 로그인한 사용자의 포트폴리오 데이터 DB 선언
  // 절대 경로 따는 법: 사진이나 그걸 command 창에 drag&drop 하면 경로 뜸!
  // 이미지는 src 폴더 경로가 아닌 public 폴더 경로에 넣어야 함!!
  // 즉, 나는 react_toy_project5-portfolio-static-data-ver/public/inae_images 폴더 안에 넣음
  // (1) 정적으로 선언
  // 포트폴리오 데이터 형식
  /*
  const portfolios = [
   {
    "status": 200,
    "message": "유저 포트폴리오 조회에 성공했습니다.",
    "data": {
        "userId": 1,
        "name": "test",
        "intro": null,
        "tags": [
            {
                "tagId": 1,
                "name": "developer"
            }
        ],
        "educations": [
            {
                "educationId": 3,
                "major": "Computer Science",
                "school": "schoolB",
                "duration": "2019~2024",
                "type": "MASTERS"
            },
            {
                "educationId": 4,
                "major": "Computer Science",
                "school": "schoolA",
                "duration": "2015~2019",
                "type": "BACHELOR"
            }
        ],
        "projects": [
            {
                "projectId": 1,
                "title": "Illy",
                "subject": "AI Hackathon",
                "category": "IT",
                "role": "backend",
                "date": "2024.01.22~2024.02.03",
                "content": "test content",
                "thumbnail": null
            }
        ],
				"interestField": "AI",
				"interestProject": "LLM",
    }
  */

  // (2) 동적으로 서버에서 가져오기
  // [1] 포폴 변수
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    getPortfolios();
  }, []);

  // AWS EC2 서버 URL과 TOKEN
  const API_URL = 'http://15.164.143.17:8080/api/v1/users';
  const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';

  // [3] 포폴 정보 가져와
  const getPortfolios = async () => {
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${TOKEN}` }
      });

      if (response.data.status === 200) {
        setPortfolios(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  }


  const tagInfos = [
    { title: '이름', dataIndex: 'name', key: 'name' },
    { title: '태그', dataIndex: 'tags', key: 'tags' },
    { title: '관심분야', dataIndex: 'interestField', key: 'interestField' },
    { title: '관심프로젝트', dataIndex: 'interestProject', key: 'interestProject' }
  ];
  

  const educationColumns = [
    { title: '학위', dataIndex: 'type', key: 'type' },
    { title: '전공', dataIndex: 'major', key: 'major' },
    { title: '학교', dataIndex: 'school', key: 'school' },
    { title: '기간', dataIndex: 'duration', key: 'duration' },
  ];

  const projectColumns = [
    { title: '프로젝트명', dataIndex: 'title', key: 'title' },
    { title: '주제', dataIndex: 'subject', key: 'subject' },
    { title: '분야', dataIndex: 'category', key: 'category' },
    { title: '역할', dataIndex: 'role', key: 'role' },
    { title: '기간', dataIndex: 'date', key: 'date' },
    { title: '설명', dataIndex: 'content', key: 'content' },
  ];




  // 추가 버튼 클릭 상태 state
  const [isAddingPortfolio, setIsAddingPortfolio] = useState(false);
  // 포트폴리오 추가 버튼 클릭 이벤트
  const onAddPortfolioClick = () => {
    setIsAddingPortfolio(true);
  }

  return (
    // 포트폴리오 컨텐츠
    // 추가 버튼 클릭시 'NewPortfolioPage' 페이지 띄워
    <div>
      {isAddingPortfolio ? 
        <NewPortfolioPage setIsAddingPortfolio={setIsAddingPortfolio} />
        : 
        <div>
          <Button type="primary" onClick={onAddPortfolioClick}>포트폴리오 추가</Button>
          <div>
            <h1>나의 포트폴리오</h1>
            <h2>프로젝트</h2>
          </div>


          <Layout>
        {/* 2) Content 포트폴리오 그리드!! */}
        {/* => 메뉴 버튼 이벤트에 따라 화면 전환 구현!! */}
        <Content style={{ margin:0, padding:0, background:'white' }}>
        <Row gutter={16}>
            {tagInfos.map(tagInfo => (
              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src="example.jpg" />}
                >
                  <Meta title={tagInfo.name} description={tagInfo.tags} />
                  <p><strong>이름</strong> {tagInfo.name} </p>
                  <p><strong>관심분야</strong> {tagInfo.interestField} </p>
                  <p><strong>관심프젝</strong> {tagInfo.interestProject} </p>
                </Card>
              </Col>
            ))}
            
            {projectColumns.map(projectColumn => (
              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img src={projectColumn.thumbnail}  />}
                >
                  <Meta title={projectColumn.date} />
                  <p><strong>프로젝트명</strong> {projectColumn.title} </p>
                  <p><strong>주제</strong> {projectColumn.subject} </p>
                  <p><strong>분야</strong> {projectColumn.category} </p>
                  <p><strong>역할</strong> {projectColumn.role} </p>
                  <p><strong>설명</strong> {projectColumn.content} </p>
                </Card>
              </Col>
            ))}
          </Row>
          {/*
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left', padding: '15px' }}>
            <div><strong>이름:</strong> {tagInfos.name}</div>
            <div><strong>태그:</strong> {tagInfos.tags}</div>
            <div><strong>관심분야:</strong> {tagInfos.interestField}</div>
            <div><strong>관심프젝:</strong> {tagInfos.interestProject}</div>

            <div><strong>학위:</strong> {educationColumns.type}</div>
            <div><strong>전공:</strong> {educationColumns.major}</div>
            <div><strong>학교:</strong> {educationColumns.school}</div>
            <div><strong>기간:</strong> {educationColumns.duration}</div>

            <div><strong>프로젝트명:</strong> {projectColumns.title}</div>
            <div><strong>주제:</strong> {projectColumns.subject}</div>
            <div><strong>분야:</strong> {projectColumns.category}</div>
            <div><strong>역할:</strong> {projectColumns.role}</div>
            <div><strong>기간:</strong> {projectColumns.date}</div>
            <div><strong>설명:</strong> {projectColumns.content}</div>
        </div>
        */}
        </Content>
      </Layout>
        </div>
        
      }
    </div>
  );
};

export default Portfolio;