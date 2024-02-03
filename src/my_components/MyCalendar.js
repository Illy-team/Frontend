/*
 * 아래 라이브러리 설치 필요
 * npm install --save react-big-calendar
 * npm install --save moment
 */

import React, {useState} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Routes, Route, Link} from "react-router-dom";
import { Layout, Row, Col } from 'antd';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MyCalendar.css';

const localizer = momentLocalizer(moment);
const { Content } = Layout;
const myBlue = 'rgb(135, 216, 248)';
const myGreen = 'rgb(173, 247, 174)';
const myYellow = 'rgb(255, 255, 145)';


// 매개인자를 안 받을경우 함수형 컴포넌트
//function MyCalendar() {

// InaeCalendar.js 컴포넌트를 호출한 상단 컴포넌트로부터 매개인자를 받으려면 괄호() 안에 props 추가
function MyCalendar({isLoggedIn, savedEvents}) {
  // 외부로부터 받아온 events를 props로 받아옵니다.
/*
  // 시작일 종료일 추출
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const setDate = (savedEvents) => {
    const dates = savedEvents.applyDate.split(' ~ '); 
    startDate = dates[0];
    endDate = dates[1];
  }
*/


  // 1. 데이터
  // 일정에 띄우는 데이터 UI(css) 함수
  // 매개변수는 다 외부로부터 받는 거라 이름에 큰 의미 없다.
  // 해당 함수 호출은 return 부분에서 할테니깐 거기서 매개 잘 넘겨주면 됨
  const eventStyleGetter = (savedEvents) => {
    let eventColor;

    if(savedEvents.type == 'ACTIVITY') {
      eventColor = myBlue;
    }else if(savedEvents.type == 'CONTEST') {
      eventColor = myGreen;
    }else {
      eventColor = myYellow;
    }

    var style = {
      backgroundColor: eventColor,
      borderRadius: '5px',
      opacity: 0.8,
      color: 'black', // 텍스트 색상을 검정색으로 변경합니다.
      //color: 'white',
      border: '0px',
      display: 'block'
    };
    return {
      style: style
    };
  };


  // 2. 화면 구성
  return (
    <div>
      {/* 
        * (1) 로그인 경로 지정 및 로그인 페이지 띄우기
        * 
        * App.js에 작성한 <Routes> 태그 부분과 경로를 맞춰줘야 함.
        */}
      <nav>
      {isLoggedIn ? ( // 로그인 상태에 따라 다른 링크를 보여줍니다.
          <Link to="/userInfo" > <h2><img src="./inae_images/alert_icon.png" alt="알림" style={{width:'30px', padding:0, margin:10, verticalAlign: 'middle'}}/> 사용자정보 </h2></Link>
        ) : (
          <>
            <Link to="/login" > <h2>로그인</h2> </Link>
            <Link to="/join" > <h2>회원가입</h2> </Link>
          </>
        )}
        {/*
        <Link to="/login" > <h2>로그인</h2> </Link>
        <Link to="/join" > <h2>회원가입</h2> </Link>
        */}
      </nav>

      {  /** 
       * Q. App.js에서 다른 페이지로 라우팅하면 페이지가 제대로 뜨는데 하위 js 파일엣 다른 페이지로 라우팅하면 페이지가 안 뜨는 이유는? 뭘 설정해줘야하지?
       * A. <Routes> 태그 내용은 App.js에서 선언해야 함^^ 그래야 동작함!
       * 
      <Routes>
        <Route path="/login" element={<LoginPage3 />} />
        <Route path="/test" element={<Test />} />
        <Route path="/join" element={<SignUp />} />
      </Routes>
        */}

      {/* 
        * (2) this.props를 이용하여 윗단에서 MainPortfolioPage.js 호출할 때 전달한 공모전 데이터 받아와서 띄우기
        * "applyDate": "2024.01.26 ~ 2024.02.16" db에 저장된 data 형식은 좌측과 같다. 해당 db를 event 변수에 저장했다. event. applyDate를 불러와서 start 변수에는 2024.01.26를, end 변수에는 후일정인 2024.02.16를 넣는 코드를 작성하시오
        */}
      <Content style={{ padding: '0 50px', borderRadius: '15px', boxShadow: '5px 5px 15px rgba(0,0,0,0.3)' }}>
        <Calendar
          localizer={localizer}
          events={savedEvents}
          startAccessor={savedEvents => moment(savedEvents.applyDate.split(' ~ ')[0]).toDate()} // 'start' 속성이 Date 객체가 되도록 수정
          endAccessor={savedEvents => moment(savedEvents.applyDate.split(' ~ ')[1]).toDate()} // 'end' 속성이 Date 객체가 되도록 수정
          style={{ height: 500 }}
          eventPropGetter={eventStyleGetter}
        />
      </Content>
    </div>
  );

};

export default MyCalendar;
