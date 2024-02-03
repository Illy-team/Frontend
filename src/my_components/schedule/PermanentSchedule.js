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
        <h3>상시 채용 공고</h3><Link to="/mySchedule"> 자세히 보기 </Link>
        </nav>
        <Row gutter={16}>
          {savedEvents
          .filter(savedEvent => savedEvent.applyDate == "상시채용") // 상시채용 공고만 필터링
          .map((savedEvent) => (
            <Col span={24} style={{padding: '0', margin: '0'}}>
              <Card style={{ borderRadius: '15px', padding: '0', margin: '0' }}>  {/* 둥근 사각형 모양으로 만들기 위해 borderRadius를 추가했습니다. */}
                {/** eventId 순이 아니라 date 날짜 순으로 정렬함 서버단에서 */}
                {/*<span> ( {savedEvent.eventId} )</span> */}
                
                {/*<span> ( {savedEvent.applyDate} )</span>*/}
                <span> ( {savedEvent.applyDate !== "" ? savedEvent.applyDate : "상시채용"} )</span>
                <p>{savedEvent.title}</p>
                <p>{savedEvent.category}</p>
                {/* 필요한 만큼 추가 정보를 표시하세요 */}
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </div>
  );

};

export default MySchedule;
