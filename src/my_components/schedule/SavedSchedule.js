import React, { useState } from 'react';
import { Routes, Route, Link} from "react-router-dom";
import { Layout, Row, Col, Card } from 'antd';
import moment from 'moment';

const { Content } = Layout;

function MySchedule({savedEvents= [] }) {
  // 화면 구성
  return (
    <div>
      {/* 
        * (1) 참여중인 일정 자세히보기 링크 추가
        * 
        * App.js에 작성한 <Routes> 태그 부분과 경로를 맞춰줘야 함.
        */}
      {/* 
        * (2) this.props를 이용하여 윗단에서 MainPortfolioPage.js 호출할 때 전달한 공모전 데이터 받아와서 띄우기
        */}
      <Content style={{ padding: '0 20px', borderRadius: '15px', boxShadow: '5px 5px 15px rgba(0,0,0,0.3)' }}>
        <nav>
        <h3>공고 일정</h3><Link to="/mySchedule"> 자세히 보기 </Link>
        </nav>
        <Row gutter={16}>
          {savedEvents.map((savedEvent) => (
            <Col span={24}>
              <Card style={{ borderRadius: '15px' }}>  {/* 둥근 사각형 모양으로 만들기 위해 borderRadius를 추가했습니다. */}
                <span> ( {savedEvent.date} )</span>
                <p>{savedEvent.title}</p>
                <p>{savedEvent.category}</p>
              </Card>
            </Col>
          ))}
        </Row>

        <Row gutter={16}>
          {savedEvents.map((savedEvent) => (
            // 저장된 공고 전체 출력하되 D-DAY 순으로 정렬 후 출력 (이미 백엔드에서 정렬 후 데이터 넣는 중이래)
            <Col span={24} style={{padding: '0', margin: '0'}}>
              <Card style={{ borderRadius: '15px', padding: '0', margin: '0' }}>  {/* 둥근 사각형 모양으로 만들기 위해 borderRadius를 추가했습니다. */}
                <span> ( {savedEvent.applyDate !== "" ? savedEvent.applyDate : "상시채용"} )</span>
                <p>{savedEvent.title}</p>
                <p>{savedEvent.hostName}</p>
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </div>
  );

};

export default MySchedule;
