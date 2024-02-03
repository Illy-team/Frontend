/* 1. 일단 Ant Design 라이브러리 이용할거니깐 설치해 */
// npm install antd

/* 2. App.js와 inae_components 폴더에서만 놀았어요 */


// 3. 라우팅을 위해 command 창에서 아래 명령어 입력
// 사실 현재는 컴포넌트 구조 테스트 중이라 라우팅(페이지 이동)은 이용 안 하지만 보통은 하니깐 습관들여
//npm install react-router-dom@6

// 4. 라우팅을 위한 기본 라이브러리 불러와
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Layout, Row, Col } from 'antd';


// 5. 나만의 js(Component) files 불러오기
// [상대경로]
// ./은 현재 경로(폴더)에서
// ../은 이전 경로에서
// ../../은 이전의 이전 경로에서
import AnnouncementAndPortfolioPage from "./AnnouncementAndPortfolioPage";
import MyCalendar from "./MyCalendar";
import ParticipatingSchedule from "./schedule/ParticipatingSchedule";
import SavedSchedule from "./schedule/SavedSchedule";
import PermanentSchedule from "./schedule/PermanentSchedule";

// 6. 다 작성했으면 command 창에서 현재 작업 프로젝트 상위 경로 (react_toy_project3-portfolio)로 이동 후
// npm start를 입력하여 실행
// 만약 빠져나오고싶다면 control + C 누르면 됨



///////////////////////////////////////////////
// 7. 정적(static) 데이터 선언
// 1) 공모전 일정 데이터 배열(리스트) 형태로 추가!!
// 주의: 1월이 0월임 (0부터 시작함 주의..!)
// new Date(year, monthIndex, date)를 사용하여 날짜를 생성하였습니다. 여기서 monthIndex는 0부터 시작하는 월의 인덱스입니다. 즉, 1월은 0, 2월은 1, ..., 12월은 11입니다.
const myBlue = 'rgb(135, 216, 248)';
const myGreen = 'rgb(173, 247, 174)';
const myYellow = 'rgb(255, 255, 145)';

// 3) 포트폴리오 페이지에 들어있을 개인(로그인 사용자) 정보 데이터
const privateInformations = {
  name: '홍길동',
  age: '30',
  address: '서울',
}




///////////////////////////////////////////////
/* 페이지 구현 방법 */
// 1) nav tag 안에 링크들 넣고
// 2) Routes tag 안에 링크와 js mapping하고
// 3) Layout tag 안에 메인 페이지 구성

const { Content } = Layout;

const HalfPage = (isLoggedIn) => {
  // [1] 저장된 공고 데이터
  // (1) 정적으로 선언
  /*
  const savedEvents = [
    {
      index: 1,
      title: 'Birthday Party',
      inae_start: moment('2024-02-03').add(2, 'hours').toDate(),
      inae_end: moment('2024-02-09').add(1, 'hours').toDate(),
      //color: 'rgb(135, 216, 248)' // 이 부분에서 일정의 색깔을 RGB로 설정합니다.
      //color: yellow
      color: myBlue
    },
    {
      index: 2,
      title: 'Business Trip',
      inae_start: moment().add(2, 'days').toDate(),  // 오늘로부터 2틀 뒤
      inae_end: moment().add(4, 'days').toDate(),
      color: myGreen
    },
    {
      index: 3,
      title: 'Inae Party',
      inae_start: moment('2024-02-04').toDate(),
      inae_end: moment('2024-02-08').toDate(),
      color: myYellow
    }
  ];
  */
  // (2) 서버에서 가져오기
  const [savedEvents, setSavedEvents] = useState([]);
      useEffect(() => {
        getSavedEvents();
      }, []);
      const getSavedEvents = async () => {
        // AWS EC2 서버 URL과 TOKEN
        const API_URL = 'http://15.164.143.17:8080/api/v1/events/saved';
        const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiaWF0IjoxNzA2ODYzMDIzLCJleHAiOjE3MDcwNzkwMjN9.0BncnMQkJPkzL37zzN3CEcclMh76kLkFXt3bMWdo05E';
        try {
          const response = await axios.get(API_URL, {
            headers: { Authorization: `Bearer ${TOKEN}` }
          });
          if (response.data.status === 200) {
            setSavedEvents(response.data.data);
          }
        } catch (error) {
          console.error(error);
        }
      }


  return (
    <Layout>
        <Content>
            {/* 페이지 2분할!!!!!! (이등분) */}
            <Row>
                {/* (1) 좌측 페이지 */}
                
                {/* 배경 회색 */}
                {/*
                <Col span={12} style={{ background: '#eee', height: '100vh', padding: '20px' }}>
                */}

                {/* 배경 하얀색 */}
                <Col span={15} style={{ background: '#fff', height: '100vh', padding: '20px' }}>
                <div className="myPortfolio">
                    {/* 메인 포트폴리오 컴포넌트를 불러올 때 데이터 전달!! */}
                    <AnnouncementAndPortfolioPage/>
                </div>
                </Col>


                {/* (2) 우측 페이지 */}
                {/* 화이트 배경 */}
                <Col span={9} style={{ background: '#fff', height: '100vh', padding: '20px' }}>
               
                <div className="myCalendar" style={{padding: '10px', margin: '10px'}}>
                    {/* 캘린더 컴포넌트를 불러올 때 데이터 전달!! */}
                    <MyCalendar
                      isLoggedIn={isLoggedIn}
                      savedEvents = {savedEvents}
                    />
                    <ParticipatingSchedule
                      savedEvents = {savedEvents} />
                    <SavedSchedule
                      savedEvents = {savedEvents} />
                    <PermanentSchedule
                      savedEvents = {savedEvents} />
                </div>
                </Col>
            </Row>
        </Content>
    </Layout>
  );
};

export default HalfPage;