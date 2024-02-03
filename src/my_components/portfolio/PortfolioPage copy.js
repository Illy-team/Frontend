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
          <Row gutter={8}>
            {
              /*
              * 포트폴리오 데이터 셋(리스트 배열형태인 portfolios) 불러와서
              * map 함수를 이용해 각 배열의 원소에 접근한다.
              * portfolios[i]를 portfolio라는 변수로 mapping해
              */
            }
            {portfolios.map((portfolio, index) => (
              <Col span={8} >
                {/* 
                  * this.props를 이용하여 윗단에서 MainPortfolioPage.js 호출할 때 전달한 포트폴리오 데이터 받아와서 띄우기
                  */}

                {/*<p>{portfolio.image}</p>*/}
                <Card
                  hoverable
                  style={{ width: '100%', marginBottom: 8 }}
                  cover={
                    <img alt={portfolio.content}
                        src={portfolio.thumbnail}
                        style={{ width: '100%', height: '20%', objectFit: 'cover' }}
                    />}

                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                  ]}
                >
                  {/* 
                    * this.props를 이용하여 윗단에서 MainPortfolioPage.js 호출할 때 전달한 포트폴리오 데이터 받아와서 띄우기
                    */}
                </Card>
              </Col>
            ))}
          </Row>


          <Row gutter={16}>
            {portfolios.map(portfolio => (
              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src="example.jpg" />}
                >
                  <Meta title={portfolio.name} description={portfolio.intro} />
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        
      }
    </div>
  );
};

export default Portfolio;