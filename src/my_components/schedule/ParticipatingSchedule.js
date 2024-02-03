import React, { useState } from 'react';
import { Routes, Route, Link} from "react-router-dom";
import { Layout, Row, Col, Card, Button } from 'antd';
import moment from 'moment';

const { Content } = Layout;

/* [schedules (저장된 공고) 데이터 형식]
 *{
    "status": 200,
    "message": "공고 조회에 성공했습니다.",
    "data": [
        {
						"eventId": 12,
            "type": "CONTEST",
            "hostName": "경산시",
            "image": "https://www.contestkorea.com/admincenter/files/meet/202401261633469580390.jpg",
            "category": "네이밍•슬로건",
            "title": "경산시 신설 파크골프장 명칭 공모전",
            "applyDate": "2024.01.26 ~ 2024.02.16",
            "link": "",
            "tasks": null,
            "requirement": "누구나, 유치원, 초등학생, 중학생, 고등학생, 대학생, 대학원생, 일반인, 외국인",
            "preferred": null,
            "activityDate": "2024.02.19 ~ 2024.03.04"
        },
				{
						"eventId": 1,
            "type": "JOB",
            "hostName": "올림플래닛(OLIM PLANET)",
            "image": "https://static.wanted.co.kr/images/wdes/0_4.a9964a61.jpg",
            "category": "영업",
            "title": "Biz 세일즈",
            "applyDate": "상시채용",
            "link": "https://www.wanted.co.kr/wd/174357",
            "tasks": "[이런 일을 함께 해요!]\n\n• B2B 대상 3D 가상공간 솔루션의 비즈니스 세일즈 전략 수립 및 실행\n• 매출 관련 선행/결과 지표 관리\n• 가상공간화 가능한 고객사 및 IP 등 비즈니스 제휴 기회 발굴",
            "requirement": "[이런 분을 찾고 있어요!]\n\n• 플랫폼/IT 분야 영업 경험이 있는 분\n• KPI 기반의 영업 계획 수립 및 성과 관리 경험이 있는 분\n• 빠르게 성장하는 조직 및 스타트업 기업 환경의 경험이 있는 분\n• 엑셀, 파워포인트, 구글 등 OA툴을 능숙하게 활용할 수 있는 분",
            "preferred": "[이런 분이라면 좋겠어요]\n\n• 플랫폼 비즈니스 경험이 있는 분 \n• 데이터 처리 및 시각화 역량을 갖춘 분\n• 목표 달성을 위한 적극적인 영업 전략 수립과 실행이 가능한 분\n• 링크드인을 비롯해 다양한 접점을 통한 비즈니스 네트워킹 파워를 소유한 분",
            "activityDate": null
        },
    ]
}
 */

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
        <h3>참여 중인 일정</h3><Link to="/mySchedule"> 자세히 보기 </Link>
        </nav>
        <Row gutter={16} >
          {savedEvents
          .filter(savedEvent => savedEvent.activityDate != null) // activityDate가 비어있지 않은 일정만 필터링 (저장된 공고가 아닌 참여중인 공고만)
          .map((savedEvent) => (
            <Col span={24} style={{padding: '0', margin: '0'}}>
              <Card style={{ borderRadius: '15px', padding: '0', margin: '0' }}>  {/* 둥근 사각형 모양으로 만들기 위해 borderRadius를 추가했습니다. */}
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
